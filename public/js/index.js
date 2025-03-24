const overlay = document.getElementById('overlay');

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'u') {
      event.preventDefault();
      if (overlay) {
        console.dir(overlay);
        overlay.hidden = !overlay.hidden;
      }
  }
});