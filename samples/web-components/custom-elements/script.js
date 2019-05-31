class SuperSpan extends HTMLElement {
  connectedCallback() {
    this.addEventListener('mouseover', this.beAwesome.bind(this))
    this.addEventListener('click', this.beAwesome.bind(this))
    this.style.display = 'inline-block';
    this.setAttribute('aria-label', this.innerText);
    switch (this.innerText) {
      case 'star': this.innerText = '⭐️';
    }
  }

  beAwesome(event) {
    let keyframes = [];
    let options = {duration: 300, iterations: 5, easing: 'ease-in-out'}
    switch (this.getAttribute('animation')) {
      case 'shine': keyframes = [
        {opacity: 1.0, blur: '0px', transform: 'rotate(0deg)'},
        {opacity: 0.7, blur: '2px', transform: 'rotate(360deg)'},
        {opacity: 1.0, blur: '0px', transform: 'rotate(0deg)'},
      ];
    }
    this.animate(keyframes, options)
  }
}

window.WebComponents.waitFor(() => customElements.define('super-span', SuperSpan))
    