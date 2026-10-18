(() => {
  const welcomeScreen = document.getElementById("welcome-screen");
  const welcomeText = document.getElementById("welcome-text");
  const progressBar = document.getElementById("welcome-progress-bar");
  const homeScreen = document.getElementById("home-screen");
  const commandForm = document.getElementById("command-form");
  const commandInput = document.getElementById("command-input");
  const terminalOutput = document.getElementById("terminal-output");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const welcomeMessage = "Welcome!";
  const typingSpeed = reducedMotion ? 0 : 115;
  const afterTypingDelay = reducedMotion ? 350 : 700;

  let typingIndex = 0;
  let hasEnteredHome = false;

  // Move from the welcome screen to the home terminal.
  function enterHome() {
    if (hasEnteredHome || !welcomeScreen || !homeScreen) return;

    hasEnteredHome = true;
    welcomeScreen.classList.add("is-leaving");

    window.setTimeout(() => {
      welcomeScreen.classList.add("is-hidden");
      homeScreen.classList.remove("is-hidden");

      if (commandInput) {
        commandInput.focus({ preventScroll: true });
      }
    }, reducedMotion ? 0 : 480);
  }

  // Type the welcome message one character at a time.
  function typeWelcome() {
    if (!welcomeText || !progressBar) return;

    if (typingIndex < welcomeMessage.length) {
      welcomeText.textContent += welcomeMessage.charAt(typingIndex);
      typingIndex += 1;

      progressBar.style.width =
        `${(typingIndex / welcomeMessage.length) * 100}%`;

      window.setTimeout(typeWelcome, typingSpeed);
      return;
    }

    window.setTimeout(enterHome, afterTypingDelay);
  }

  // Terminal command responses.
  const commands = {
    experience: "Opening experience page...",
    projects: "Opening projects page...",
    skills: "Opening skills page...",
    gallery: "Opening gallery page",
    help:
      "Available commands: about, experience, projects, skills, gallery, help, clear, home.",
    home: "You are already on the home page.",
    clear: ""
  };

  // Add terminal output safely without inserting raw HTML.
  function addOutput(command, message, isError = false) {
    if (!terminalOutput) return;

    if (command === "clear") {
      terminalOutput.replaceChildren();
      return;
    }

    const line = document.createElement("p");
    line.className = "output-line";

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = "guest> ";

    const typed = document.createElement("span");
    typed.className = "accent";
    typed.textContent = command;

    line.append(prompt, typed);
    terminalOutput.append(line);

    if (message) {
      const response = document.createElement("p");
      response.className =
        `output-line${isError ? " error" : ""}`;
      response.textContent = message;
      terminalOutput.append(response);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Process commands submitted through the terminal.
  function runCommand(rawCommand) {
    const command = rawCommand
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    if (!command) return;

    // Navigate to About.
    if (command === "about") {
      window.location.href = "pages/about.html";
      return;
    }

    // Navigate to Experience.
    if (command === "experience") {
      window.location.href = "pages/experience.html";
      return;
    }

    // Navigate to Projects.
    if (command === "projects") {
      window.location.href = "pages/projects.html";
      return;
    }

    // Navigate to Skills.
    if (command === "skills"){
      window.location.href="pages/skills.html";
      return;
    }

    // Navigate to Gallery.
    if (command === "gallery"){
      window.location.href="pages/gallery.html"
    }

    // Keep the user on the current home page.
    if (command === "home") {
      addOutput(command, commands.home);

      if (commandInput) {
        commandInput.value = "";
      }

      return;
    }

    // Process other supported commands.
    if (Object.prototype.hasOwnProperty.call(commands, command)) {
      addOutput(command, commands[command]);
    } else {
      addOutput(
        command,
        `Command not found: "${command}". Type "help" to list available commands.`,
        true
      );
    }

    if (commandInput) {
      commandInput.value = "";
    }
  }

  // Handle terminal form submission.
  if (commandForm && commandInput) {
    commandForm.addEventListener("submit", (event) => {
      event.preventDefault();
      runCommand(commandInput.value);
    });

    commandForm.addEventListener("click", () => {
      commandInput.focus({ preventScroll: true });
    });
  }

  // Connect Home menu buttons to terminal commands.
  document.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      runCommand(button.dataset.command);

      if (commandInput) {
        commandInput.focus({ preventScroll: true });
      }
    });
  });

  // Returning from another page skips the welcome animation.
  const params = new URLSearchParams(window.location.search);
  const skipWelcome = params.get("skipWelcome") === "1";

  if (skipWelcome) {
    welcomeScreen?.classList.add("is-hidden");
    homeScreen?.classList.remove("is-hidden");
    hasEnteredHome = true;

    if (commandInput) {
      commandInput.focus({ preventScroll: true });
    }
  } else if (reducedMotion) {
    if (welcomeText) {
      welcomeText.textContent = welcomeMessage;
    }

    if (progressBar) {
      progressBar.style.width = "100%";
    }

    window.setTimeout(enterHome, 350);
  } else {
    typeWelcome();
  }
})();
