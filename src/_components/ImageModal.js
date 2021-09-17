export default class ImageModal {
  constructor(src) {
    this.src = src
    this.modalWrapper = document.createElement('div')
    this.modalWrapper.className = 'modal-wrapper'
    document.querySelector('.app').appendChild(this.modalWrapper)
    this.render()
  }

  removeModal() {
    this.modalWrapper.remove()
  }

  addHandleCloseEvent() {
    document.addEventListener('onblur', () => this.removeModal())
    document.querySelector('.overlay').addEventListener('click', (e) => {
      if (e.class !== 'modal-image') this.removeModal()
    })
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && this.removeModal()
    })
  }

  createModalContent() {
    const overlay = document.createElement('div')
    overlay.className = 'overlay'
    const modalContent = document.createElement('section')
    modalContent.className = 'modal-content'
    const closeButton = document.createElement('span')
    closeButton.innerText = 'X'
    closeButton.className = 'close-button'
    closeButton.addEventListener('click', () => this.removeModal())
    const modalImage = document.createElement('img')
    modalImage.className = 'modal-image'
    modalImage.src = this.src

    this.modalWrapper.appendChild(overlay)
    this.modalWrapper.appendChild(modalContent)
    modalContent.appendChild(closeButton)
    modalContent.appendChild(modalImage)

    this.addHandleCloseEvent()
  }

  render() {
    this.createModalContent()
  }
}
