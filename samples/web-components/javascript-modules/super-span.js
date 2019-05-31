// star.js

const options = {duration: 300, iterations: 5, easing: 'ease-in-out'}
const keyframes = [
  {opacity: 1.0, blur: '0px', transform: 'rotate(0deg)'},
  {opacity: 0.7, blur: '3px', transform: 'rotate(360deg)'},
  {opacity: 1.0, blur: '0px', transform: 'rotate(0deg)'},
]

const template = document.createElement('template')
template.innerHTML = `
  <style>
    span {
      display: inline-block;
      font-weight: var(--super-font-weight, bolder);
    }

    abbr {
      text-decoration: none;
    }
  </style>
  <span><slot></slot></span>
  <abbr title="click or mouse over">👈🖱</abbr>
`;

class SuperSpan extends HTMLElement {
  
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector)
  }
  
  constructor() {
    super()
    const onMouse = this.shine.bind(this)
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'})
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    const slot = this.$('slot')
    const [node] = slot.assignedNodes()
 
    this.setAttribute('aria-label', node.textContent)
    node.textContent = '⭐️'
    
    this.addEventListener('click', onMouse)
    this.addEventListener('mouseover', onMouse)
  }
  
  shine(event) {
    this.$('span').animate(keyframes, options)
  }
}

window.WebComponents.waitFor(() => customElements.define('super-span', SuperSpan))
