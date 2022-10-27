import './style.css';
class Grid {
  element = document.createElement('div');
  constructor(arrayForPuzzle) {
    this.className = 'grid';
    this.element.classList.add('grid');
    this.renderTiles(arrayForPuzzle);
  }
  renderTiles(arrayForPuzzle) {
    this.className =
      arrayForPuzzle.flat().length === 9
        ? 'grid-three'
        : arrayForPuzzle.flat().length === 16
        ? 'grid'
        : arrayForPuzzle.flat().length === 25
        ? 'grid-five'
        : arrayForPuzzle.flat().length === 36
        ? 'grid-six'
        : arrayForPuzzle.flat().length === 49
        ? 'grid-seven'
        : 'grid-eight';
    this.element.innerHTML = '';
    this.element.classList.remove(this.element.classList[0]);
    this.element.classList.add(this.className);
    arrayForPuzzle.flat().forEach((item) => {
      const div = document.createElement('div');
      div.classList.add(`${this.className}-tile`, 'tile');
      item ? (div.innerHTML = item) : (div.innerHTML = '');
      this.element.append(div);
    });
  }
}
export default Grid;
