export function launchConfetti(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  const colors = ["#FF4D8D", "#7B4FFF", "#FFD600", "#00C9B1", "#FF6B4A", "#00D4FF"];
  for (let i = 0; i < 50; i++) {
    const dot = document.createElement("div");
    const size = 8 + Math.random() * 10;
    dot.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      left:${Math.random() * 100}%;
      top:-20px;
      animation:confettiFall ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 0.6}s forwards;
    `;
    container.appendChild(dot);
  }
}
