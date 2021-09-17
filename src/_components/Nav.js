export default class Nav {
  constructor($target, handleIconClick) {
    const nav = document.createElement('nav')
    const path = document.createElement('span')
    const homeIcon = document.querySelector('.home-icon')
    nav.className = 'nav'
    path.className = 'directory-path'
    homeIcon.addEventListener('click', handleIconClick)
    nav.appendChild(path)
    nav.appendChild(homeIcon)
    $target.appendChild(nav)

    this.directoryPath = ['root']
    this.path = path
    this.render()
  }

  setPath(newPath) {
    if (newPath.length === 0) {
      this.directoryPath = ['root']
    } else {
      this.directoryPath.push(newPath)
    }
    this.render()
  }

  render() {
    this.path.innerText = this.directoryPath.join('-')
  }
}
