class SoundControler {
  element = document.createElement('div');
  span = document.createElement('span');
  checkBox = document.createElement('input');
  constructor() {
    this.element.classList.add('sound-control');
    this.checkBox.setAttribute('type', 'checkbox');
    this.span.innerHTML = 'Sound effect:';
    this.span.classList.add('sound-control__span');
    this.element.append(this.span, this.checkBox);
  }
}
export default SoundControler;
