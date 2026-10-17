
(() => {
  "use strict";

  const container = document.getElementById("experience-list");
  const countElement = document.getElementById("experience-count");

  if (!container) return;

  /*
   * EXPERIENCE DATA
   *
   * Update the images array with your actual image paths.
   * Use images: [] when an experience has no preview images.
   *
   * Image paths are relative to pages/experience.html.
   */
  const experiences = [
    {
      id: "software-engineer",
      title: "Software Engineer",
      organization: "LumiaTech Innovation",
      type: "Professional Experience",
      period: "December 2024 – August 2026",
      description:
        "Worked on research and development of image processing and computer vision solutions for application requirements.",
      responsibilities: [
        "Developed PyQt6 applications and user interfaces integrated with image processing features.",
        "Implemented features for image visualization and analysis.",
        "Evaluated different approaches to improve application functionality and usability."
      ],
      images: [
        "../assets/images/experience/software-engineer-1.png",
        "../assets/images/experience/software-engineer-2.png",
        "../assets/images/experience/software-engineer-3.png"
      ]
    },
    {
      id: "lab-coordinator",
      title: "Laboratory Assistant Coordinator",
      organization:
        "Intelligent Biomedical System Laboratory, Telkom University",
      type: "Laboratory Experience",
      period: "August 2025 – August 2026",
      description:
        "Coordinated laboratory assistants and supervisors during practical sessions and laboratory operations.",
      responsibilities: [
        "Prepared practical schedules, task assignments, and operational requirements.",
        "Coordinated with assistants and supervisors to support laboratory activities.",
        "Helped resolve operational issues through communication and coordination."
      ],
      images: [
        "../assets/images/experience/lab-coordinator-1.jpg"
      ]
    },
    {
      id: "teaching-assistant",
      title: "Teaching Assistant",
      organization: "Basic Computing Laboratory",
      type: "Teaching Experience",
      period: "June 2023 – July 2025",
      description:
        "Assisted students during basic computing practical sessions, including C programming activities.",
      responsibilities: [
        "Supported students during programming practical sessions.",
        "Assisted with practical projects conducted over two to three weeks.",
        "Supported practical project presentations and related activities."
      ],
      images: []
    },
    {
      id: "maintenance-logistics",
      title: "Senior Committee Coordinator – Maintenance & Logistics",
      organization: "Basic Computing Laboratory",
      type: "Organizational Experience",
      period: "June 2024 – July 2025",
      description:
        "Coordinated maintenance and logistics activities to support laboratory operations.",
      responsibilities: [],
      images: []
    }
  ];

  // -----------------------------------------
  // HELPERS
  // -----------------------------------------

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

  /*
   * Check each image before adding it to the carousel.
   * Images that cannot be loaded are excluded.
   */
  function loadImage(src) {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => {
        resolve({
          src,
          width: image.naturalWidth,
          height: image.naturalHeight
        });
      };

      image.onerror = () => {
        console.warn("Experience image could not be loaded:", src);
        resolve(null);
      };

      image.src = src;
    });
  }

  // -----------------------------------------
  // IMAGE CAROUSEL
  // -----------------------------------------

  function createCarousel(experience) {
    const imagePaths = Array.isArray(experience.images)
      ? experience.images.filter(
          (src) => typeof src === "string" && src.trim() !== ""
        )
      : [];

    // No images configured: omit the entire preview section.
    if (imagePaths.length === 0) {
      return null;
    }

    const carousel = createElement(
      "section",
      "image-carousel"
    );

    const heading = createElement(
      "div",
      "carousel-heading"
    );

    heading.append(
      createElement("span", "", "IMAGE PREVIEW")
    );

    const counter = createElement(
      "span",
      "carousel-counter",
      "Loading..."
    );

    counter.setAttribute("aria-live", "polite");
    heading.append(counter);

    const viewport = createElement(
      "div",
      "carousel-viewport"
    );

    viewport.setAttribute(
      "aria-label",
      `${experience.title} image gallery`
    );

    const image = createElement(
      "img",
      "preview-image"
    );

    image.alt = "";
    image.draggable = false;
    image.loading = "lazy";

    viewport.append(image);

    const controls = createElement(
      "div",
      "carousel-controls"
    );

    const previousButton = createElement(
      "button",
      "carousel-button",
      "←"
    );

    previousButton.type = "button";
    previousButton.setAttribute(
      "aria-label",
      `Previous image for ${experience.title}`
    );

    const nextButton = createElement(
      "button",
      "carousel-button",
      "→"
    );

    nextButton.type = "button";
    nextButton.setAttribute(
      "aria-label",
      `Next image for ${experience.title}`
    );

    controls.append(previousButton, nextButton);

    const hint = createElement(
      "p",
      "carousel-hint",
      "Use the arrows or swipe left/right to browse images."
    );

    carousel.append(heading, viewport, controls, hint);

    let validImages = [];
    let currentIndex = 0;

    function showImage(index) {
      if (validImages.length === 0) return;

      // Wrap around at both ends of the gallery.
      currentIndex =
        (index + validImages.length) % validImages.length;

      const currentImage = validImages[currentIndex];

      image.src = currentImage.src;
      image.alt =
        `${experience.title} preview, image ` +
        `${currentIndex + 1} of ${validImages.length}`;

      counter.textContent =
        `${currentIndex + 1} / ${validImages.length}`;

      const multipleImages = validImages.length > 1;

      previousButton.hidden = !multipleImages;
      nextButton.hidden = !multipleImages;
      hint.hidden = !multipleImages;
      counter.hidden = !multipleImages;
    }

    previousButton.addEventListener("click", () => {
      showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
      showImage(currentIndex + 1);
    });

    // Allow navigation with left/right arrow keys
    // when the gallery itself is focused.
    viewport.tabIndex = 0;
    viewport.setAttribute(
      "aria-label",
      `Image gallery for ${experience.title}. Use left and right arrow keys.`
    );

    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showImage(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showImage(currentIndex + 1);
      }
    });

    // Touch swipe support for mobile devices.
    let touchStartX = 0;
    let touchStartY = 0;

    viewport.addEventListener(
      "touchstart",
      (event) => {
        const touch = event.changedTouches[0];

        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      },
      { passive: true }
    );

    viewport.addEventListener(
      "touchend",
      (event) => {
        const touch = event.changedTouches[0];

        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        // Ignore small movements and primarily vertical swipes.
        if (
          Math.abs(deltaX) < 45 ||
          Math.abs(deltaX) <= Math.abs(deltaY)
        ) {
          return;
        }

        if (deltaX < 0) {
          showImage(currentIndex + 1);
        } else {
          showImage(currentIndex - 1);
        }
      },
      { passive: true }
    );

    /*
     * Validate images asynchronously.
     * The card remains available even if every image fails.
     */
    Promise.all(imagePaths.map(loadImage)).then((results) => {
      validImages = results.filter(
        (result) => result && result.width > 0 && result.height > 0
      );

      if (validImages.length === 0) {
        carousel.remove();
        return;
      }

      showImage(0);
    });

    return carousel;
  }

  // -----------------------------------------
  // EXPERIENCE CARD
  // -----------------------------------------

  function createExperienceCard(experience, index) {
    const card = createElement("article", "content-card");
    card.id = `experience-${experience.id}`;

    const header = createElement(
      "div",
      "content-card-header"
    );

    const headingGroup = createElement("div");

    const number = createElement(
      "p",
      "experience-period",
      `ENTRY_${String(index + 1).padStart(2, "0")}`
    );

    const title = createElement(
      "h2",
      "content-card-title",
      experience.title
    );

    const organization = createElement(
      "p",
      "experience-organization",
      experience.organization
    );

    const period = createElement(
      "p",
      "experience-period",
      experience.period
    );

    headingGroup.append(number, title, organization, period);

    const type = createElement(
      "span",
      "experience-type",
      experience.type
    );

    header.append(headingGroup, type);

    const description = createElement(
      "p",
      "experience-description",
      experience.description
    );

    card.append(header, description);

    // Add responsibilities only when there are items.
    if (
      Array.isArray(experience.responsibilities) &&
      experience.responsibilities.length > 0
    ) {
      const list = createElement(
        "ul",
        "content-card-list"
      );

      experience.responsibilities.forEach((item) => {
        list.append(createElement("li", "", item));
      });

      card.append(list);
    }

    // Add a carousel only when image paths are provided.
    const carousel = createCarousel(experience);

    if (carousel) {
      card.append(carousel);
    }

    return card;
  }

  // -----------------------------------------
  // RENDER ALL EXPERIENCES
  // -----------------------------------------

  function renderExperiences() {
    container.replaceChildren();

    if (experiences.length === 0) {
      container.append(
        createElement(
          "p",
          "experience-empty",
          "No experience entries have been added yet."
        )
      );

      if (countElement) {
        countElement.textContent = "0 ENTRIES";
      }

      return;
    }

    const fragment = document.createDocumentFragment();

    experiences.forEach((experience, index) => {
      fragment.append(
        createExperienceCard(experience, index)
      );
    });

    container.append(fragment);

    if (countElement) {
      countElement.textContent =
        `${experiences.length} ENTRIES`;
    }
  }

  renderExperiences();
})();





/*
Experience with some photo:
images: [
  "../assets/images/experience/software-engineer-1.png",
  "../assets/images/experience/software-engineer-2.png",
  "../assets/images/experience/software-engineer-3.png"
]

Experience with 1 photo:
images: [
  "../assets/images/experience/lab-coordinator-1.jpg"
]


Experience without photo:
images: []
*/
