import ImageModal from './ImageModal.js'

export default class MainContainer {
  constructor($target, cats, handleClick) {
    const mainContainer = document.createElement('div')
    mainContainer.className = 'main-container'
    $target.appendChild(mainContainer)

    this.cats = cats
    this.mainContainer = mainContainer
    this.handleClick = handleClick
    this.render()
  }

  enumerateCatFoldersAndFiles(cats) {
    cats.map((cat) => {
      const dir = document.createElement('li')
      const dirImage = document.createElement('button')
      const dirName = document.createElement('span')
      dir.className = 'dir'
      dirImage.className = 'dirImage'
      if (cat.type === 'DIRECTORY') {
        dirImage.innerText = 'dir'
      } else if (cat.type === 'FILE') {
        dirImage.innerText = 'file'
      }
      dirName.className = 'dirName'
      dirName.innerText = cat.name
      this.mainContainer.appendChild(dir)
      dir.appendChild(dirImage)
      dir.appendChild(dirName)

      dirImage.addEventListener('click', (e) => this.handleClick(e, cat))
    })
  }

  setData(data) {
    this.cats = data
    this.render()
  }

  showModal(src) {
    const modalImage = new ImageModal(src)
  }

  render() {
    this.mainContainer.innerHTML = ''
    this.enumerateCatFoldersAndFiles(this.cats)
  }
}
