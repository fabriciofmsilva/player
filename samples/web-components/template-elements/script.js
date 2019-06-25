const input = document.getElementById('input');
const cloneIt = document.getElementById('clone-it');

cloneIt.onclick = () => superAlert(input.value);

function superAlert(message) {
  const template = document.getElementById('dialog-template');
  const clone = template.content.cloneNode(true);
  const diag = clone.firstElementChild;

  // <dialog> element polyfill
  window.dialogPolyfill.registerDialog(diag);

  diag.firstElementChild.textContent = message;
  diag.lastElementChild.onclick = function closeModal() {
    diag.close();
    diag.remove();
  }
  document.body.appendChild(diag)
  diag.showModal();
}
