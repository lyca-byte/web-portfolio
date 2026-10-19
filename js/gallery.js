
/* =========================================
   GALLERY PAGE
   Artwork collection + optional process videos
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");
  const searchInput = document.getElementById("gallery-search");
  const filtersContainer = document.getElementById("gallery-filters");
  const statusText = document.getElementById("gallery-status");
  const resetButton = document.getElementById("gallery-reset");

  const dialog = document.getElementById("artwork-dialog");
  const detailContent = document.getElementById("detail-content");
  const closeButton = document.getElementById("detail-close");

  if (
    !galleryGrid ||
    !searchInput ||
    !filtersContainer ||
    !statusText ||
    !resetButton ||
    !dialog ||
    !detailContent ||
    !closeButton
  ) {
    return;
  }

  /* =========================================
     ARTWORK DATA
     =========================================

     To add a work:
     1. Put its image in assets/images/gallery/.
     2. Optionally put its process video in assets/videos/gallery/.
     3. Add an object to the artworks array below.
     4. Leave processVideo as an empty string if no video exists.

     Image paths are relative to pages/gallery.html.

     Example object:
const artworks = [
     {
       id: "digital-sketch-01",
       title: "Digital Sketch",
       category: "Digital Drawing",
       year: "2026",
       description: "A personal digital drawing study.",
       tools: ["ibis Paint"],
       image: "../assets/images/gallery/digital-sketch-01.jpg",
       processVideo: "../assets/videos/gallery/digital-sketch-01.mp4",
       processDescription:
         "A recording of the drawing process in ibis Paint.",
       tags: ["Drawing", "Personal Work"],
       externalLink: ""
     }
]
     For artwork without a process video, use:
       processVideo: ""

     Supported image formats depend on the browser.
     JPG, PNG, and WebP are recommended for artwork images.
     MP4 (H.264) is recommended for process videos.
  */

  const artworks = [
    {
        id:'digital-drawing-01',
        title:'sunset.',
        category:'Digital Drawing',
        year:"2024",
        description:"",
        tools:"ibisPaint X",
        image:"../assets/images/gallery/sunset.png",
        processVideo: "../assets/video/gallery/sunset.mp4",
        processDescription:"",
        tags:["Digital Art", "Personal Work"],
        externalLink:""
    }
  ];

  /* =========================================
     STATE
     ========================================= */

  let activeCategory = "all";
  let lastFocusedElement = null;

  /* =========================================
     HELPERS
     ========================================= */

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = text;
    }

    return element;
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  function isSafeMediaPath(path) {
    if (typeof path !== "string" || !path.trim()) {
      return false;
    }

    /*
     * Allow relative local paths and HTTP(S) URLs.
     * Reject other URL protocols.
     */
    try {
      const url = new URL(path, window.location.href);

      return (
        url.protocol === "http:" ||
        url.protocol === "https:"
      );
    } catch {
      return false;
    }
  }

  function isSafeExternalLink(path) {
    if (typeof path !== "string" || !path.trim()) {
      return false;
    }

    try {
      const url = new URL(path);

      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }

  function hasProcessVideo(artwork) {
    return isSafeMediaPath(artwork.processVideo);
  }

  function getCategoryNames() {
    return [
      ...new Set(
        artworks
          .map((artwork) => String(artwork.category || "").trim())
          .filter(Boolean)
      )
    ].sort((a, b) => a.localeCompare(b));
  }

  function getFilteredArtworks() {
    const query = normalizeText(searchInput.value);

    return artworks.filter((artwork) => {
      const categoryMatches =
        activeCategory === "all" ||
        artwork.category === activeCategory;

      const searchableContent = [
        artwork.title,
        artwork.category,
        artwork.year,
        artwork.description,
        ...(Array.isArray(artwork.tools) ? artwork.tools : []),
        ...(Array.isArray(artwork.tags) ? artwork.tags : [])
      ].join(" ");

      const queryMatches =
        normalizeText(searchableContent).includes(query);

      return categoryMatches && queryMatches;
    });
  }

  /* =========================================
     CATEGORY FILTERS
     ========================================= */

  function renderFilters() {
    filtersContainer.replaceChildren();

    const filters = [
      { id: "all", label: "All Artwork" },
      ...getCategoryNames().map((category) => ({
        id: category,
        label: category
      }))
    ];

    /*
     * If the currently selected category no longer exists,
     * reset to All Artwork.
     */
    if (
      activeCategory !== "all" &&
      !filters.some((filter) => filter.id === activeCategory)
    ) {
      activeCategory = "all";
    }

    filters.forEach((filter) => {
      const button = createElement(
        "button",
        "gallery-filter",
        filter.label
      );

      button.type = "button";
      button.dataset.category = filter.id;

      const isActive = activeCategory === filter.id;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));

      button.addEventListener("click", () => {
        activeCategory = filter.id;

        renderFilters();
        renderGallery();
      });

      filtersContainer.append(button);
    });
  }

  /* =========================================
     ARTWORK IMAGE / PLACEHOLDER
     ========================================= */

  function createArtworkImage(artwork, className) {
    const wrapper = createElement("div", className);

    if (!isSafeMediaPath(artwork.image)) {
      wrapper.append(createImagePlaceholder());
      return wrapper;
    }

    const image = createElement("img");

    image.src = artwork.image;
    image.alt = artwork.title || "Artwork";
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("error", () => {
      wrapper.replaceChildren(createImagePlaceholder());
    }, { once: true });

    wrapper.append(image);

    return wrapper;
  }

  function createImagePlaceholder() {
    const placeholder = createElement("div", "artwork-placeholder");

    const symbol = createElement(
      "span",
      "artwork-placeholder-symbol",
      "◇"
    );

    const label = createElement(
      "span",
      "artwork-placeholder-label",
      "ARTWORK PREVIEW UNAVAILABLE"
    );

    placeholder.append(symbol, label);

    return placeholder;
  }

  /* =========================================
     ARTWORK CARD
     ========================================= */

  function createArtworkCard(artwork) {
    const article = createElement("article", "artwork-card");

    const openButton = createElement("button", "artwork-open");
    openButton.type = "button";

    openButton.setAttribute(
      "aria-label",
      `View details for ${artwork.title || "artwork"}`
    );

    openButton.append(
      createArtworkImage(artwork, "artwork-thumbnail")
    );

    const content = createElement("div", "artwork-card-content");

    const category = createElement(
      "span",
      "artwork-category",
      artwork.category || "Uncategorized"
    );

    const title = createElement(
      "h2",
      "artwork-title",
      artwork.title || "Untitled Artwork"
    );

    const description = createElement(
      "p",
      "artwork-description",
      artwork.description || "Personal creative work."
    );

    const footer = createElement("div", "artwork-card-footer");

    const year = createElement(
      "span",
      "artwork-year",
      artwork.year || "Personal work"
    );

    const processAvailable = hasProcessVideo(artwork);

    const processIndicator = createElement(
      "span",
      `process-indicator${processAvailable ? "" : " no-process"}`,
      processAvailable
        ? "▶ Process available"
        : "Artwork only"
    );

    footer.append(year, processIndicator);
    content.append(category, title, description, footer);
    openButton.append(content);
    article.append(openButton);

    openButton.addEventListener("click", () => {
      openArtworkDetail(artwork, openButton);
    });

    return article;
  }

  /* =========================================
     GALLERY RENDER
     ========================================= */

  function renderGallery() {
    const filteredArtworks = getFilteredArtworks();
    galleryGrid.replaceChildren();

    if (filteredArtworks.length === 0) {
      const emptyMessage = createElement(
        "p",
        "gallery-empty",
        artworks.length === 0
          ? "No artwork has been added yet. Add your artwork data in js/gallery.js to populate this gallery."
          : "No artwork matches your search. Try another keyword or reset the filters."
      );

      galleryGrid.append(emptyMessage);

      statusText.textContent =
        artworks.length === 0
          ? "0 artworks available."
          : "No matching artwork.";

      return;
    }

    const fragment = document.createDocumentFragment();

    filteredArtworks.forEach((artwork) => {
      fragment.append(createArtworkCard(artwork));
    });

    galleryGrid.append(fragment);

    statusText.textContent =
      `Showing ${filteredArtworks.length} of ${artworks.length} artwork(s).`;
  }

  /* =========================================
     ARTWORK DETAIL
     ========================================= */

  function openArtworkDetail(artwork, triggerElement) {
    lastFocusedElement = triggerElement;
    detailContent.replaceChildren();

    const title = createElement(
      "h2",
      "detail-title",
      artwork.title || "Untitled Artwork"
    );

    title.id = "detail-title";

    const meta = createElement("div", "detail-meta");

    [
      artwork.category,
      artwork.year,
      ...(Array.isArray(artwork.tools) ? artwork.tools : [])
    ]
      .filter(Boolean)
      .forEach((value) => {
        meta.append(
          createElement("span", "detail-meta-item", value)
        );
      });

    const image = isSafeMediaPath(artwork.image)
      ? createElement("img", "detail-artwork")
      : null;

    if (image) {
      image.src = artwork.image;
      image.alt = artwork.title || "Artwork";
      image.loading = "eager";
      image.decoding = "async";

      image.addEventListener("error", () => {
        image.replaceWith(
          createElement(
            "div",
            "detail-artwork-placeholder",
            "Artwork image could not be loaded."
          )
        );
      }, { once: true });
    }

    const description = createElement(
      "p",
      "detail-description",
      artwork.description || "Personal creative work."
    );

    detailContent.append(title, meta);

    if (image) {
      detailContent.append(image);
    } else {
      detailContent.append(
        createElement(
          "div",
          "detail-artwork-placeholder",
          "No artwork image has been assigned."
        )
      );
    }

    detailContent.append(description);

    /* Tags */
    if (Array.isArray(artwork.tags) && artwork.tags.length > 0) {
      const tagsSection = createElement("section", "detail-section");

      tagsSection.append(
        createElement("h3", "detail-section-title", "TAGS")
      );

      const tagsContainer = createElement("div", "detail-tags");

      artwork.tags.forEach((tag) => {
        tagsContainer.append(
          createElement("span", "detail-tag", tag)
        );
      });

      tagsSection.append(tagsContainer);
      detailContent.append(tagsSection);
    }

    /* Optional process video */
    const processSection = createElement("section", "detail-section");

    processSection.append(
      createElement("h3", "detail-section-title", "CREATIVE PROCESS")
    );

    if (hasProcessVideo(artwork)) {
      const processNote = createElement(
        "p",
        "detail-process-note",
        artwork.processDescription ||
          "Watch the recorded process behind this artwork."
      );

      const video = createElement("video", "detail-video");

      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.setAttribute("aria-label", `Process video for ${artwork.title}`);

      const source = document.createElement("source");
      source.src = artwork.processVideo;
      source.type = "video/mp4";

      video.append(source);

      video.append(
        document.createTextNode(
          "Your browser does not support embedded video. "
        )
      );

      processSection.append(processNote, video);

      video.addEventListener("error", () => {
        const errorMessage = createElement(
          "p",
          "detail-process-note",
          "The process video could not be loaded. Please check its file path and format."
        );

        if (video.parentElement) {
          video.replaceWith(errorMessage);
        }
      }, { once: true });
    } else {
      processSection.append(
        createElement(
          "p",
          "detail-process-note",
          "A process video is not available for this artwork. The finished work is still available to view."
        )
      );
    }

    detailContent.append(processSection);

    /* Optional external link */
    if (isSafeExternalLink(artwork.externalLink)) {
      const link = createElement(
        "a",
        "detail-link",
        "Open related link ↗"
      );

      link.href = artwork.externalLink;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      detailContent.append(link);
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    closeButton.focus();
  }

  /* =========================================
     DIALOG CONTROLS
     ========================================= */

  function stopDetailVideos() {
    detailContent.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.removeAttribute("src");

      video.querySelectorAll("source").forEach((source) => {
        source.removeAttribute("src");
      });

      video.load();
    });
  }

  function closeArtworkDetail() {
    if (dialog.open) {
      dialog.close();
    }
  }

  closeButton.addEventListener("click", closeArtworkDetail);

  dialog.addEventListener("click", (event) => {
    /*
     * Clicks on the dialog backdrop close the detail.
     * Clicks inside the panel do not.
     */
    if (event.target === dialog) {
      closeArtworkDetail();
    }
  });

  dialog.addEventListener("close", () => {
    stopDetailVideos();
    detailContent.replaceChildren();

    if (
      lastFocusedElement &&
      document.contains(lastFocusedElement)
    ) {
      lastFocusedElement.focus();
    }

    lastFocusedElement = null;
  });

  /* =========================================
     SEARCH AND RESET
     ========================================= */

  searchInput.addEventListener("input", renderGallery);

  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    activeCategory = "all";

    renderFilters();
    renderGallery();

    searchInput.focus();
  });

  /* =========================================
     INITIALIZE
     ========================================= */

  renderFilters();
  renderGallery();
});
