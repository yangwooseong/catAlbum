export default class Header {
  constructor($target) {
    const header = document.createElement('header')
    header.className = 'header'
    header.innerText = '고양이 사진첩'
    $target.append(header)
  }
}
