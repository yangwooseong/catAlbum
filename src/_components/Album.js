import api from '../api/getCatImages.js'
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

  async handleIconClick() {
    const data = await api.fetchRootDirectory()
    this.mainContainer.setData(data)
    this.nav.setPath('')
  }

  async getRootImages() {
    const data = await api.fetchRootDirectory()
    this.mainContainer = new MainContainer(this.album, data, this.handleClick)
  }

  async handleClick(e, cat) {
    this.nav.setPath(cat.name)

    if (cat.type === 'DIRECTORY') {
      const data = await api.fetchDirectory(cat.id)
      console.log(data)
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
