const template = document.getElementById('component-template')
const button = document.getElementById('button')
const display = document.getElementById('display')

const report = message => display.textContent = message

button.onclick = () => report('Clicked on Document')

// Let's give the polyfill a leg-up
window.ShadyCSS && window.ShadyCSS.prepareTemplate(template, 'awesome-button') 

class AwesomeButton extends HTMLElement {
  constructor() {
    super()
    this.onclick = () => report('Clicked on Shadow DOM')
    
  }
  
  connectedCallback() {
    // Let's give the polyfill a leg-up
    window.ShadyCSS && window.ShadyCSS.styleElement(this)
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  }
}

window.WebComponents.waitFor(() => customElements.define('awesome-button', AwesomeButton))
