
/* =========================================
   SKILLS PAGE
   Data-driven skill categories and filters
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const skillsList = document.getElementById("skills-list");
  const searchInput = document.getElementById("skill-search");
  const filtersContainer = document.getElementById("skills-filters");
  const resultStatus = document.getElementById("skills-result-status");

  const technologyCount = document.getElementById("technology-count");
  const categoryCount = document.getElementById("category-count");
  const softSkillCount = document.getElementById("soft-skill-count");

  if (
    !skillsList ||
    !searchInput ||
    !filtersContainer ||
    !resultStatus
  ) {
    return;
  }

  /*
   * Skill levels are included only where stated in the CV.
   * Other technologies are listed without an assigned level.
   */

  const categories = [
    {
      id: "programming",
      title: "Programming & Web Development",
      description:
        "Programming languages, web technologies, and scripting.",
      skills: [
        { name: "C", level: "Upper-Intermediate" },
        { name: "C++" },
        { name: "Python", level: "Upper-Intermediate" },
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "JavaScript" },
        { name: "Bash Scripting" },
        { name: "LaTeX" }
      ]
    },
    {
      id: "machine-learning",
      title: "Machine Learning & Data Science",
      description:
        "Machine learning frameworks, data processing, and numerical analysis.",
      skills: [
        { name: "TensorFlow" },
        { name: "Keras" },
        { name: "PyTorch" },
        { name: "scikit-learn" },
        { name: "NumPy" },
        { name: "Pandas" },
        { name: "SciPy" },
        { name: "Matplotlib" }
      ]
    },
    {
      id: "computer-vision",
      title: "Computer Vision & Image Processing",
      description:
        "Image processing, visual computing, and image-editing tools.",
      skills: [
        { name: "OpenCV" },
        { name: "Computer Vision", level: "Intermediate" },
        { name: "Image Processing", level: "Intermediate" },
        { name: "Adobe Photoshop" }
      ]
    },
    {
      id: "embedded",
      title: "Embedded Systems & Microcontrollers",
      description:
        "Microcontroller-related development and hardware interaction.",
      skills: [
        { name: "Arduino" },
        { name: "Microcontrollers", level: "Upper-Intermediate" }
      ]
    },
    {
      id: "tools",
      title: "Development Tools & Productivity",
      description:
        "Version control, deployment, design, and productivity tools.",
      skills: [
        { name: "Git", level: "Intermediate" },
        { name: "GitHub", level: "Intermediate" },
        { name: "Vercel" },
        { name: "Canva" },
        { name: "Microsoft Word", level: "Upper-Intermediate" },
        { name: "Microsoft Excel", level: "Intermediate" }
      ]
    }
  ];

  const softSkills = [
    "Problem Solving",
    "Adaptability",
    "Communication"
  ];

  let activeCategory = "all";

  const totalTechnologies = categories.reduce(
    (total, category) => total + category.skills.length,
    0
  );

  technologyCount.textContent = String(totalTechnologies).padStart(2, "0");
  categoryCount.textContent = String(categories.length).padStart(2, "0");
  softSkillCount.textContent = String(softSkills.length).padStart(2, "0");

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
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  /* =========================================
     CATEGORY FILTER BUTTONS
     ========================================= */

  function renderFilters() {
    filtersContainer.replaceChildren();

    const filters = [
      { id: "all", label: "All Skills" },
      ...categories.map((category) => ({
        id: category.id,
        label: category.title
      }))
    ];

    filters.forEach((filter) => {
      const button = createElement(
        "button",
        "skills-filter-button",
        filter.label
      );

      button.type = "button";
      button.dataset.category = filter.id;
      button.setAttribute(
        "aria-pressed",
        String(activeCategory === filter.id)
      );

      if (activeCategory === filter.id) {
        button.classList.add("is-active");
      }

      button.addEventListener("click", () => {
        activeCategory = filter.id;
        renderFilters();
        renderSkills();
      });

      filtersContainer.append(button);
    });
  }

  /* =========================================
     SKILL TAGS
     ========================================= */

  function createSkillTag(skill) {
    const tag = createElement("span", "skill-tag");

    if (skill.level) {
      tag.classList.add("has-level");
    }

    const name = createElement(
      "span",
      "skill-tag-name",
      skill.name
    );

    tag.append(name);

    if (skill.level) {
      const level = createElement(
        "span",
        "skill-tag-level",
        skill.level
      );

      tag.append(level);
    }

    return tag;
  }

  /* =========================================
     CATEGORY CARD
     ========================================= */

  function createCategoryCard(category, index, matchingSkills) {
    const card = createElement("article", "skill-category-card");

    const header = createElement("div", "skill-category-header");

    const number = createElement(
      "span",
      "skill-category-number",
      `${String(index + 1).padStart(2, "0")}.`
    );

    const headingGroup = createElement("div");
    const heading = createElement(
      "h2",
      "skill-category-heading",
      category.title
    );

    const description = createElement(
      "p",
      "skill-category-description",
      category.description
    );

    headingGroup.append(heading, description);
    header.append(number, headingGroup);

    const tags = createElement("div", "skill-tags");

    matchingSkills.forEach((skill) => {
      tags.append(createSkillTag(skill));
    });

    card.append(header, tags);

    return card;
  }

  /* =========================================
     SEARCH AND RENDER
     ========================================= */

  function renderSkills() {
    const query = normalizeText(searchInput.value);
    const fragment = document.createDocumentFragment();

    let visibleCategoryCount = 0;
    let visibleSkillCount = 0;

    categories.forEach((category, index) => {
      if (
        activeCategory !== "all" &&
        activeCategory !== category.id
      ) {
        return;
      }

      const matchingSkills = category.skills.filter((skill) => {
        const searchableText = normalizeText(
          `${skill.name} ${skill.level || ""} ${category.title} ${category.description}`
        );

        return searchableText.includes(query);
      });

      if (matchingSkills.length === 0) {
        return;
      }

      visibleCategoryCount += 1;
      visibleSkillCount += matchingSkills.length;

      fragment.append(
        createCategoryCard(category, index, matchingSkills)
      );
    });

    skillsList.replaceChildren();

    if (visibleSkillCount === 0) {
      const emptyMessage = createElement(
        "p",
        "skills-empty",
        "No skills found. Try another keyword or select a different category."
      );

      skillsList.append(emptyMessage);
    } else {
      skillsList.append(fragment);
    }

    resultStatus.textContent =
      `Showing ${visibleSkillCount} skill(s) in ` +
      `${visibleCategoryCount} categor${visibleCategoryCount === 1 ? "y" : "ies"}.`;
  }

  /* =========================================
     INITIALIZE
     ========================================= */

  searchInput.addEventListener("input", renderSkills);

  renderFilters();
  renderSkills();
});
