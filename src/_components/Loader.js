export default class Loader {
  constructor($target) {
    const loader = document.createElement('div')
    $target.innerHTML = ''
    loader.innerText = 'Loading...'
    loader.className = 'loader'
    this.loader = loader
    $target.appendChild(loader)

    this.render()
  }

  closeLoader() {
    this.loader.remove()
  }

  render() {}
}
