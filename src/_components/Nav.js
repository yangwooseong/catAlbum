export default class Nav {
  constructor($target, handleIconClick) {
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

    $target.appendChild(nav)
    this.render()
  }

  getPathSpan(catName, catId) {
    const span = document.createElement('span')
    span.className = `${catName}`
    span.id = catId
    span.innerText = catName === 'root' ? catName : '-' + catName

    return span
  }

  setPath(catName, catId = '') {
    this.directoryPath.appendChild(this.getPathSpan(catName, catId))
    this.render()
  }

  render() {}
}
