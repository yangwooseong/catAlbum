export default class Loader {
  constructor($target) {
    const loader = document.createElement('div')
    this.loader = loader
    this.$target = $target
    this.render()
  }

  closeLoader() {
    this.loader.remove()
    this.allowMouseEvent()
  }

  blockMouseEvent() {
    const album = document.querySelector('.album')
    album.classList.add('not-active')
  }

  allowMouseEvent() {
    const album = document.querySelector('.album')
    album.classList.remove('not-active')
  }

  render() {
    this.blockMouseEvent()
    this.$target.innerHTML = ''
    this.loader.innerText = 'Loading...'
    this.loader.className = 'loader'
    this.$target.appendChild(this.loader)
  }
}
