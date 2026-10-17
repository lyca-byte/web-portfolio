
/* ========================================
   PROJECTS PAGE
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const projectsList = document.getElementById("projects-list");
    const projectCount = document.getElementById("project-count");

    if (!projectsList || !projectCount) {
        return;
    }

    /*
     * PROJECT DATA
     *
     * To add a project:
     * 1. Add a new object to this array.
     * 2. Add preview images to assets/images/projects/.
     * 3. Update the image paths in the object.
     *
     * Use an empty images array if a project has no screenshots yet.
     */

    const projects = [
        {
            title: "POSREVICE - Posture Corrector",
            category: "Computer Vision",
            period: "2025",
            description:
                "An offline posture-monitoring application developed as a capstone design project. The application uses camera input and pose estimation to support posture monitoring.",
            technologies: [
                "Python",
                "OpenCV",
                "MediaPipe",
                "PyQt5",
                "Pygame",
                "PyQtGraph"
            ],
            images: [
                {
                    src: "../assets/images/projects/posrevice-1.jpg",
                    alt: "POSREVICE application preview"
                },
                {
                    src: "../assets/images/projects/posrevice-2.jpg",
                    alt: "POSREVICE posture monitoring preview"
                }
            ],
            links: [
                {
                    label: "GitHub Repository",
                    url: "https://github.com/lyca-byte/posture-corrector"
                }
            ]
        },
        {
            title: "Demand Forecasting",
            category: "Data Science / Forecasting",
            period: "2025",
            description:
                "A time-series forecasting project using the Online Retail II dataset. Several forecasting approaches were evaluated, with Prophet achieving an MAE of 39,757, RMSE of 47,584, and MAPE of 16.75% in the reported evaluation.",
            technologies: [
                "Python",
                "Pandas",
                "Time Series",
                "Prophet",
                "Data Visualization"
            ],
            images: [
                {
                    src: "../assets/images/projects/demand-forecasting-1.png",
                    alt: "Demand forecasting results"
                },
                {
                    src: "../assets/images/projects/demand-forecasting-2.png",
                    alt: "Demand forecasting visualization"
                }
            ],
            links: [
                {
                    label: "GitHub Repository",
                    url: "https://github.com/lyca-byte/Demand-Forecasting"
                }
            ]
        },
        {
            title: "MLForge",
            category: "Machine Learning",
            period: "2026",
            description:
                "A no-code machine learning application developed as part of the IBM SkillsBuild University Education and Hacktiv8 program. It integrates a web interface with a machine learning backend to support model-related workflows.",
            technologies: [
                "Python",
                "FastAPI",
                "TensorFlow",
                "Keras",
                "REST API",
                "Vercel"
            ],
            images: [
                {
                    src: "../assets/images/projects/mlforge-1.png",
                    alt: "MLForge application interface"
                },
                {
                    src: "../assets/images/projects/mlforge-2.png",
                    alt: "MLForge machine learning workflow"
                }
            ],
            links: [
                {
                    label: "GitHub Repository",
                    url: "https://github.com/lyca-byte/MLForge"
                }
            ]
        },
        {
            title: "MVTec-AD Anomaly Detection",
            category: "Computer Vision / Anomaly Detection",
            period: "2026",
            description:
                "An image-based anomaly detection project focused on anomaly scoring, threshold-based decisions, localization, heatmap visualization, and evaluation metrics.",
            technologies: [
                "Python",
                "Computer Vision",
                "Anomaly Detection",
                "Image Processing",
                "Hugging Face"
            ],
            images: [
                {
                    src: "../assets/images/projects/mvtec-ad-1.png",
                    alt: "MVTec-AD anomaly detection result"
                },
                {
                    src: "../assets/images/projects/mvtec-ad-2.png",
                    alt: "MVTec-AD anomaly heatmap visualization"
                }
            ],
            links: [
                {
                    label: "GitHub Repository",
                    url: "https://github.com/lyca-byte/MVTec-AD"
                }
            ]
        },
        {
            title: "Business Data Analysis and Revenue Prediction Platform",
            category: "Data Analysis / Machine Learning",
            period: "2026",
            description:
                "A business data analysis and revenue prediction platform developed as part of the IBM SkillsBuild University Education and Hacktiv8 program. It combines business analysis features with a linear regression model for revenue prediction.",
            technologies: [
                "Python",
                "Pandas",
                "Scikit-learn",
                "Linear Regression",
                "AI Agent",
                "Vercel"
            ],
            images: [
                {
                    src: "../assets/images/projects/business-analysis-1.png",
                    alt: "Business analysis platform interface"
                },
                {
                    src: "../assets/images/projects/business-analysis-2.png",
                    alt: "Revenue prediction platform result"
                }
            ],
            links: [
                {
                    label: "GitHub Repository",
                    url: "https://github.com/lyca-byte/Business-Data-Analysis-and-Revenue-Prediction-Platform"
                },
                {
                    label: "Live Demo",
                    url: "https://business-data-analysis-and-revenue.vercel.app"
                }
            ]
        }
    ];

    /* ========================================
       HELPERS
       ======================================== */

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

    function isValidExternalUrl(url) {
        try {
            const parsedUrl = new URL(url);

            return (
                parsedUrl.protocol === "https:" ||
                parsedUrl.protocol === "http:"
            );
        } catch {
            return false;
        }
    }

    /* ========================================
       PROJECT CAROUSEL
       ======================================== */

    // function createCarousel(images, projectTitle) {
    //     const carousel = createElement("div", "image-carousel");

    //     carousel.setAttribute("role", "region");
    //     carousel.setAttribute("aria-label", `${projectTitle} screenshots`);

    //     const heading = createElement("div", "carousel-heading");
    //     heading.appendChild(
    //         createElement("span", "", "PROJECT PREVIEW")
    //     );

    //     const counter = createElement("span", "carousel-counter", "");
    //     counter.setAttribute("aria-live", "polite");
    //     heading.appendChild(counter);

    //     const viewport = createElement("div", "carousel-viewport");
    //     const image = createElement("img", "preview-image");

    //     image.alt = `${projectTitle} preview`;
    //     image.loading = "lazy";
    //     image.decoding = "async";

    //     viewport.appendChild(image);

    //     const controls = createElement("div", "carousel-controls");

    //     const previousButton = createElement(
    //         "button",
    //         "carousel-button",
    //         "←"
    //     );

    //     previousButton.type = "button";
    //     previousButton.setAttribute(
    //         "aria-label",
    //         `Previous ${projectTitle} screenshot`
    //     );

    //     const nextButton = createElement(
    //         "button",
    //         "carousel-button",
    //         "→"
    //     );

    //     nextButton.type = "button";
    //     nextButton.setAttribute(
    //         "aria-label",
    //         `Next ${projectTitle} screenshot`
    //     );

    //     controls.append(previousButton, nextButton);

    //     const hint = createElement(
    //         "p",
    //         "carousel-hint",
    //         "Use the buttons to browse project screenshots."
    //     );

    //     carousel.append(heading, viewport, controls, hint);

    //     /*
    //      * If the project has no screenshots, show a message
    //      * instead of broken image controls.
    //      */
    //     if (!Array.isArray(images) || images.length === 0) {
    //         viewport.replaceChildren(
    //             createElement(
    //                 "p",
    //                 "project-empty",
    //                 "No project preview images available yet."
    //             )
    //         );

    //         controls.hidden = true;
    //         hint.hidden = true;
    //         counter.textContent = "0 images";

    //         return carousel;
    //     }

    //     let currentIndex = 0;

    //     function showImage(index) {
    //         currentIndex = (index + images.length) % images.length;

    //         const currentImage = images[currentIndex];

    //         image.onerror = () => {
    //             image.onerror = null;
    //             image.removeAttribute("src");
    //             image.alt = "Preview image could not be loaded.";

    //             viewport.replaceChildren(
    //                 createElement(
    //                     "p",
    //                     "project-empty",
    //                     `Preview unavailable: ${currentImage.src}`
    //                 )
    //             );
    //         };

    //         image.src = currentImage.src;
    //         image.alt = currentImage.alt || `${projectTitle} preview`;

    //         counter.textContent =
    //             `${currentIndex + 1} / ${images.length}`;

    //         /*
    //          * Hide navigation when there is only one image.
    //          */
    //         const hasMultipleImages = images.length > 1;

    //         previousButton.hidden = !hasMultipleImages;
    //         nextButton.hidden = !hasMultipleImages;
    //         hint.hidden = !hasMultipleImages;

    //         /*
    //          * Reset the viewport in case a previous image failed.
    //          */
    //         if (image.parentElement !== viewport) {
    //             viewport.replaceChildren(image);
    //         }
    //     }

    //     previousButton.addEventListener("click", () => {
    //         showImage(currentIndex - 1);
    //     });

    //     nextButton.addEventListener("click", () => {
    //         showImage(currentIndex + 1);
    //     });

    //     /*
    //      * Optional keyboard navigation while the carousel
    //      * or its controls are focused.
    //      */
    //     carousel.addEventListener("keydown", (event) => {
    //         if (event.key === "ArrowLeft") {
    //             event.preventDefault();
    //             showImage(currentIndex - 1);
    //         } else if (event.key === "ArrowRight") {
    //             event.preventDefault();
    //             showImage(currentIndex + 1);
    //         }
    //     });

    //     showImage(0);

    //     return carousel;
    // }


/* ========================================
   PROJECT CAROUSEL
   Shared carousel classes and swipe behavior
   ======================================== */

    function createCarousel(images, projectTitle) {
        const carousel = createElement("div", "image-carousel");

        carousel.setAttribute("role", "region");
        carousel.setAttribute("aria-label", `${projectTitle} screenshots`);

        const heading = createElement("div", "carousel-heading");
        heading.appendChild(
            createElement("span", "", "PROJECT PREVIEW")
        );

        const counter = createElement("span", "carousel-counter", "");
        counter.setAttribute("aria-live", "polite");
        heading.appendChild(counter);

        const viewport = createElement("div", "carousel-viewport");

        viewport.setAttribute(
            "aria-label",
            `${projectTitle} image gallery. Swipe left or right to browse images.`
        );

        viewport.tabIndex = 0;

        const image = createElement("img", "preview-image");

        image.alt = `${projectTitle} preview`;
        image.loading = "lazy";
        image.decoding = "async";
        image.draggable = false;

        viewport.appendChild(image);

        const controls = createElement("div", "carousel-controls");

        const previousButton = createElement(
            "button",
            "carousel-button",
            "←"
        );

        previousButton.type = "button";
        previousButton.setAttribute(
            "aria-label",
            `Previous ${projectTitle} screenshot`
        );

        const nextButton = createElement(
            "button",
            "carousel-button",
            "→"
        );

        nextButton.type = "button";
        nextButton.setAttribute(
            "aria-label",
            `Next ${projectTitle} screenshot`
        );

        controls.append(previousButton, nextButton);

        const hint = createElement(
            "p",
            "carousel-hint",
            "Use the buttons or swipe left/right to browse images."
        );

        carousel.append(heading, viewport, controls, hint);

        /*
        * Handle projects without preview images.
        */
        if (!Array.isArray(images) || images.length === 0) {
            viewport.replaceChildren(
                createElement(
                    "p",
                    "project-empty",
                    "No project preview images available yet."
                )
            );

            controls.hidden = true;
            hint.hidden = true;
            counter.textContent = "0 images";

            return carousel;
        }

        let currentIndex = 0;

        /*
        * Display an image by index.
        * Navigation wraps around at both ends.
        */
        function showImage(index) {
            currentIndex = (index + images.length) % images.length;

            const currentImage = images[currentIndex];

            // Restore the image element if the previous image failed.
            if (image.parentElement !== viewport) {
                viewport.replaceChildren(image);
            }

            image.onerror = () => {
                image.onerror = null;
                image.removeAttribute("src");
                image.alt = "Preview image could not be loaded.";

                viewport.replaceChildren(
                    createElement(
                        "p",
                        "project-empty",
                        "Preview image could not be loaded. Please check the image path."
                    )
                );
            };

            image.src = currentImage.src;
            image.alt = currentImage.alt || `${projectTitle} preview`;
            image.draggable = false;

            counter.textContent =
                `${currentIndex + 1} / ${images.length}`;

            const hasMultipleImages = images.length > 1;

            previousButton.hidden = !hasMultipleImages;
            nextButton.hidden = !hasMultipleImages;
            hint.hidden = !hasMultipleImages;
            counter.hidden = !hasMultipleImages;
        }

        /*
        * Previous and Next buttons.
        */
        previousButton.addEventListener("click", () => {
            showImage(currentIndex - 1);
        });

        nextButton.addEventListener("click", () => {
            showImage(currentIndex + 1);
        });

        /*
        * Keyboard navigation.
        */
        viewport.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                showImage(currentIndex - 1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                showImage(currentIndex + 1);
            }
        });

        /*
        * Touch swipe support for mobile devices.
        * This follows the same behavior as Experience:
        * - Swipe left  -> next image
        * - Swipe right -> previous image
        * - Vertical scrolling remains available
        */
        let touchStartX = 0;
        let touchStartY = 0;

        viewport.addEventListener(
            "touchstart",
            (event) => {
                if (event.touches.length !== 1) {
                    touchStartX = 0;
                    touchStartY = 0;
                    return;
                }

                const touch = event.touches[0];

                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
            },
            { passive: true }
        );

        viewport.addEventListener(
            "touchend",
            (event) => {
                if (touchStartX === 0 && touchStartY === 0) {
                    return;
                }

                const touch = event.changedTouches[0];

                const deltaX = touch.clientX - touchStartX;
                const deltaY = touch.clientY - touchStartY;

                // Reset touch coordinates after each gesture.
                touchStartX = 0;
                touchStartY = 0;

                /*
                * Ignore short movements and vertical gestures.
                * This prevents ordinary page scrolling from
                * accidentally changing the preview image.
                */
                if (
                    Math.abs(deltaX) < 45 ||
                    Math.abs(deltaX) <= Math.abs(deltaY)
                ) {
                    return;
                }

                if (deltaX < 0) {
                    // Swipe left: next image.
                    showImage(currentIndex + 1);
                } else {
                    // Swipe right: previous image.
                    showImage(currentIndex - 1);
                }
            },
            { passive: true }
        );

        /*
        * Reset the gesture if the touch is interrupted.
        */
        viewport.addEventListener(
            "touchcancel",
            () => {
                touchStartX = 0;
                touchStartY = 0;
            },
            { passive: true }
        );

        /*
        * Initialize the first image.
        */
        showImage(0);

        return carousel;
    }


    /* ========================================
       PROJECT CARD
       ======================================== */

    function createProjectCard(project) {
        const card = createElement("article", "content-card project-card");

        const header = createElement("div", "project-card-header");
        const heading = createElement("div", "project-card-heading");

        heading.appendChild(
            createElement("span", "project-category", project.category)
        );

        heading.appendChild(
            createElement("h2", "content-card-title", project.title)
        );

        const period = createElement(
            "span",
            "project-period",
            project.period
        );

        header.append(heading, period);

        const description = createElement(
            "p",
            "project-description",
            project.description
        );

        const carousel = createCarousel(project.images, project.title);

        const technologyHeading = createElement(
            "h3",
            "project-subheading",
            "Technologies"
        );

        const technologyList = createElement("ul", "project-tech-list");

        (project.technologies || []).forEach((technology) => {
            technologyList.appendChild(
                createElement("li", "project-tech-tag", technology)
            );
        });

        const linksContainer = createElement("div", "project-links");

        (project.links || []).forEach((link) => {
            if (!link.url || !isValidExternalUrl(link.url)) {
                return;
            }

            const anchor = createElement(
                "a",
                "project-link",
                link.label
            );

            anchor.href = link.url;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";

            linksContainer.appendChild(anchor);
        });

        card.append(
            header,
            description,
            carousel,
            technologyHeading,
            technologyList
        );

        if (linksContainer.children.length > 0) {
            card.appendChild(linksContainer);
        }

        return card;
    }

    /* ========================================
       RENDER PROJECTS
       ======================================== */

    function renderProjects() {
        projectsList.replaceChildren();

        if (projects.length === 0) {
            projectCount.textContent = "0 projects";

            projectsList.appendChild(
                createElement(
                    "p",
                    "project-empty",
                    "No projects have been added yet."
                )
            );

            return;
        }

        const fragment = document.createDocumentFragment();

        projects.forEach((project) => {
            fragment.appendChild(createProjectCard(project));
        });

        projectsList.appendChild(fragment);

        projectCount.textContent =
            `${projects.length} project${projects.length === 1 ? "" : "s"}`;
    }

    try {
        renderProjects();
    } catch (error) {
        console.error("Failed to render projects:", error);

        projectCount.textContent = "Error";

        projectsList.replaceChildren(
            createElement(
                "p",
                "project-error",
                "Unable to load the project list. Check the browser console for details."
            )
        );
    }
});
