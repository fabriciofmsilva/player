const content = document.querySelector('.card-content')
const button = document.getElementById('button')
const message = document.getElementById('message')
const components = document.getElementById('components')

window.WebComponents.waitFor(() => document.querySelector('main').removeAttribute('hidden'))

button.onclick = () => {
  content.hidden = !content.hidden;
  button.textContent = content.hidden ? '🚀 Launch' : '☠️ Close'
}
                             