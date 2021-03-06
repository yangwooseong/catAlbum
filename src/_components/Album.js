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

    this.handleDirectoryClick = this.handleDirectoryClick.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)
    this.handlePathClick = this.handlePathClick.bind(this)

    this.nav = new Nav(this.album, this.handleIconClick, this.handlePathClick)

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

  handlePathClick(e) {
    if (e.target.innerText === 'root') {
      this.fetchRootDirectoryData()
      this.nav.resetPath()
    } else {
      this.fetchDirectoryOrFileData(e.target.id)
      const directoryPath = document.querySelector('.directory-path')
      let lastChild = directoryPath.lastChild
      while (lastChild.id !== e.target.id) {
        lastChild.remove()
        lastChild = directoryPath.lastChild
      }
    }
  }

  getRootImages() {
    this.mainContainer = new MainContainer(
      this.album,
      [],
      this.handleDirectoryClick
    )
    this.fetchRootDirectoryData()
  }

  handleDirectoryClick(e, cat) {
    if (cat.type === 'DIRECTORY') {
      this.nav.setPath(cat.name, cat.id)
      this.fetchDirectoryOrFileData(cat.id)
    } else if (cat.type === 'FILE') {
      const endpoint =
        'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public/'
      const filepath = cat.filePath.startsWith('/')
        ? cat.filePath.slice(1)
        : cat.filePath
      this.mainContainer.showModal(endpoint + filepath)
    }
  }

  async fetchRootDirectoryData() {
    const loader = new Loader(document.querySelector('.main-container'))
    const data = this.getCachedData('root') || (await api.fetchRootDirectory())
    loader.closeLoader()
    this.mainContainer.setData(data)
    this.setCachedData('root', data)
  }

  async fetchDirectoryOrFileData(catId) {
    if (catId === '') catId = 'root'
    const loader = new Loader(document.querySelector('.main-container'))
    const data = this.getCachedData(catId) || (await api.fetchDirectory(catId))
    loader.closeLoader()
    this.mainContainer.setData(data)
    this.setCachedData(catId, data)
  }

  getCachedData(catId) {
    const cachedData = JSON.parse(localStorage.getItem('cache')) || {}
    return cachedData[catId]
  }

  setCachedData(catId, data) {
    const cachedData = JSON.parse(localStorage.getItem('cache')) || {}
    if (cachedData[catId]) return
    localStorage.setItem(
      'cache',
      JSON.stringify({ ...cachedData, [catId]: data })
    )
  }

  render() {
    this.getRootImages()
  }
}
