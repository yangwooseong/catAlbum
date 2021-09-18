export default class Nav {
  constructor($target, handleIconClick, handlePathClick) {
    const nav = document.createElement('nav')
    nav.className = 'nav'

    const homeIcon = document.querySelector('.home-icon')
    homeIcon.addEventListener('click', handleIconClick)
    nav.appendChild(homeIcon)
    const backIcon = document.querySelector('.back-icon')
    backIcon.addEventListener('click', handleIconClick)
    nav.appendChild(backIcon)

    const directoryPath = document.createElement('div')
    directoryPath.className = 'directory-path'
    nav.appendChild(directoryPath)
    this.directoryPath = directoryPath
    this.resetPath()

    $target.appendChild(nav)
    this.handlePathClick = handlePathClick
    this.render()
  }

  createPathSpan(catName, catId) {
    const span = document.createElement('span')
    span.className = 'path'
    span.id = catId
    span.innerText = catName === 'root' ? catName : '-' + catName

    return span
  }

  resetPath() {
    this.directoryPath.innerHTML = ''
    this.setPath('root')
  }

  setPath(catName, catId = '') {
    const span = this.createPathSpan(catName, catId)
    span.addEventListener('click', (e) => {
      this.handlePathClick(e)
    })
    this.directoryPath.appendChild(span)

    this.render()
  }

  render() {}
}
