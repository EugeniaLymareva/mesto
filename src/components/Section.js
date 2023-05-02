export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items
    this.renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  initRenderer() {
    this._renderedItems.forEach(item => {
      this.renderer(item)
    })
  }

  addItem(cardElement) {
    this._container.prepend(cardElement)
  }
}
