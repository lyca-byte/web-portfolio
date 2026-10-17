(() => {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ012345789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 15;
  let columns = 0;
  let drops = [];
  let width = 0;
  let height = 0;
  let animationFrame = 0;
  let lastFrame = 0;
  const frameInterval = 45;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.ceil(width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
  }

  function draw(timestamp) {
    animationFrame = window.requestAnimationFrame(draw);
    if (timestamp - lastFrame < frameInterval) return;
    lastFrame = timestamp;

    ctx.fillStyle = "rgba(3, 8, 6, 0.085)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillStyle = Math.random() > 0.975 ? "#b8fff0" : "#20B2AA";
      ctx.globalAlpha = Math.random() * 0.45 + 0.18;
      ctx.fillText(char, x, y);
      ctx.globalAlpha = 1;

      if (y > height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += Math.random() * 0.45 + 0.2;
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationFrame);
    } else {
      lastFrame = 0;
      animationFrame = window.requestAnimationFrame(draw);
    }
  });

  window.addEventListener("resize", resize, { passive: true });
  resize();
  animationFrame = window.requestAnimationFrame(draw);
})();
