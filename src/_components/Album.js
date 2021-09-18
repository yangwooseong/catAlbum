import api from '../api/getCatImages.js'
import Loader from './Loader.js'
import MainContainer from './MainContainer.js'
import Nav from './Nav.js'

export default class Album {
  constructor($target) {
    const album = document.createElement('div') // div -> ?
    album.className = 'album'
    $target.appendChild(album)
    this.album = album

    this.handleClick = this.handleClick.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)

    this.nav = new Nav(this.album, this.handleIconClick)

    this.render()
  }

  handleIconClick(e) {
    if (e.target.className === 'home-icon') {
      this.nav.resetPath()
      this.fetchRootDirectoryData()
    } else if (e.target.className === 'back-icon') {
      const directoryPath = document.querySelector('.directory-path')
      const loader = new Loader(document.querySelector('.main-container'))
      if (directoryPath.lastChild.innerText === 'root') {
        this.fetchRootDirectoryData()
      } else {
        directoryPath.lastChild.remove()
        this.fetchDirectoryOrFileData(directoryPath.lastChild.id)
      }
    }
  }

  getRootImages() {
    this.mainContainer = new MainContainer(this.album, [], this.handleClick)
    this.fetchRootDirectoryData()
  }

  handleClick(e, cat) {
    if (cat.type === 'DIRECTORY') {
      this.nav.setPath(cat.name, cat.id)
      this.fetchDirectoryOrFileData(cat.id)
    } else if (cat.type === 'FILE') {
      const endpoint =
        'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public/'
      const filepath = cat.filePath.startsWith('/')
        ? cat.filePath.slice(1)
        : cat.filePath
      const src = endpoint + filepath
      this.mainContainer.showModal(src)
    }
  }

  async fetchRootDirectoryData() {
    const loader = new Loader(document.querySelector('.main-container'))
    const data = await api.fetchRootDirectory()
    loader.closeLoader()
    this.mainContainer.setData(data)
  }

  async fetchDirectoryOrFileData(catId) {
    const loader = new Loader(document.querySelector('.main-container'))
    const data = await api.fetchDirectory(catId)
    loader.closeLoader()
    this.mainContainer.setData(data)
  }

  render() {
    this.getRootImages()
  }
}
