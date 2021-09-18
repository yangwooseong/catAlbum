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
    this.getRootImages()

    this.render()
  }

  async handleIconClick(e) {
    if (e.target.className === 'home-icon') {
      this.nav.setPath('root')
      const loader = new Loader(document.querySelector('.mainContainer'))
      const data = await api.fetchRootDirectory()
      loader.closeLoader()
      this.mainContainer.setData(data)
    } else if (e.target.className === 'back-icon') {
      // const directoryPath = document.querySelector('.directory-path')
      // directoryPath
      console.log('back icon clicked')
    }
  }

  async getRootImages() {
    this.nav.setPath('root')
    this.mainContainer = new MainContainer(this.album, [], this.handleClick)
    const loader = new Loader(document.querySelector('.mainContainer'))
    const data = await api.fetchRootDirectory()
    loader.closeLoader()
    this.mainContainer.setData(data)
  }

  async handleClick(e, cat) {
    this.nav.setPath(cat.name)

    if (cat.type === 'DIRECTORY') {
      const loader = new Loader(document.querySelector('.mainContainer'))
      const data = await api.fetchDirectory(cat.id)
      loader.closeLoader()
      this.mainContainer.setData(data)
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

  render() {}
}
