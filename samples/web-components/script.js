/* global Prism, WebComponents  */

const reload = document.getElementById('reload-button');
const scroll = document.getElementById('scroll-button');
const lazyImages = document.querySelector('#lazy-images');
const output = document.querySelector('#output');

const scrollIntoView = () =>
  lazyImages.style.transform = 'translateY(0)';

const updateTree = (e) => undefined

const observer = new MutationObserver(updateTree);

observer.observe(lazyImages, { attributes: true, childList: true, subtree: true })

WebComponents.waitFor(() => setTimeout(updateTree));

scroll.addEventListener('click', scrollIntoView)
reload.addEventListener('click', () => location.reload());
