import Button from '../components/button/button';
import Grid from '../components/grid/grid';
class MainPage {
  buttonsWrapper = document.createElement('div');
  constructor() {
    this.arrayForPuzzle = Array.from({ length: 16 }, (_, i) => i);
    this.buttonStart = new Button({ text: 'Shuffle and start', className: 'button-start' }).element;
    this.buttonStop = new Button({ text: 'Stop', className: 'button-stop' }).element;
    this.buttonSave = new Button({ text: 'Save', className: 'button-save' }).element;
    this.buttonResult = new Button({ text: 'Result', className: 'button-result' }).element;

    this.shuffleArray = this.сhunkArray(this.shuffleArrayForPuzzle(), 4);
    this.grid = new Grid(this.shuffleArray);
    this.render();
    this.addEventListenerToButtonStart();
    this.addEventListenerToButtonStop();
    this.addEventListenerToButtonSave();
    this.addEventListenerToButtonResult();
    this.addEventListenerToGridWrapper();
    this.addEventListenerToWrapperButtons();
  }
  render() {
    const body = document.querySelector('body');
    this.buttonsWrapper.append(
      new Button({ text: '3x3', className: 'button-size' }).element,
      new Button({ text: '4x4', className: 'button-size' }).element,
      new Button({ text: '5x5', className: 'button-size' }).element,
      new Button({ text: '6x6', className: 'button-size' }).element,
      new Button({ text: '7x7', className: 'button-size' }).element,
      new Button({ text: '8x8', className: 'button-size' }).element
    );
    body.append(
      this.buttonStart,
      this.buttonStop,
      this.buttonSave,
      this.buttonResult,
      this.grid.element,
      this.buttonsWrapper
    );
  }
  addEventListenerToWrapperButtons() {
    this.buttonsWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('button-size')) {
        const arrSizeTiles = e.target.textContent.split('x');
        const sumTiles = arrSizeTiles.reduce((a, b) => +a * +b);
        this.arrayForPuzzle = Array.from({ length: sumTiles }, (_, i) => i);
        this.shuffleArray = this.сhunkArray(this.shuffleArrayForPuzzle(), Math.sqrt(sumTiles));
        this.grid.renderTiles(this.shuffleArray);
      }
    });
  }
  addEventListenerToGridWrapper() {
    this.grid.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('tile')) {
        this.checkPositionTils(e.target.textContent);
      }
    });
  }
  addEventListenerToButtonStart() {
    this.buttonStart.addEventListener('click', () => {
      this.shuffleArray = this.сhunkArray(this.shuffleArrayForPuzzle(), 4);
      this.grid.renderTiles(this.shuffleArray);
    });
  }
  addEventListenerToButtonStop() {
    this.buttonStop.addEventListener('click', () => {
      console.log('stop');
    });
  }
  addEventListenerToButtonSave() {
    this.buttonSave.addEventListener('click', () => {
      console.log('save');
    });
  }
  addEventListenerToButtonResult() {
    this.buttonResult.addEventListener('click', () => {
      console.log('result');
    });
  }
  checkPositionTils(textTile) {
    let posX = 0;
    let posY = 0;
    if (textTile !== '0') {
      for (let i = 0; i < this.shuffleArray.length; i++) {
        for (let j = 0; j < this.shuffleArray[i].length; j++) {
          if (this.shuffleArray[i][j] === +textTile) {
            posX = i;
            posY = j;
          }
        }
      }
      this.checkTils(posX, posY);
    }
  }
  checkTils(posX, posY) {
    const objPosition = {
      elem: this.shuffleArray[posX][posY],
      top: [posX - 1, posY],
      bottom: [posX + 1, posY],
      left: [posX, posY - 1],
      right: [posX, posY + 1],
    };
    for (let i in objPosition) {
      if (i !== 'elem') {
        if (
          objPosition[i][0] >= 0 &&
          objPosition[i][0] <= this.shuffleArray.length - 1 &&
          objPosition[i][1] >= 0 &&
          objPosition[i][1] <= this.shuffleArray.length - 1
        ) {
          console.log(this.shuffleArray[objPosition[i][0]][[objPosition[i][1]]]);
        }
      }
    }
  }
  checkEmptyTils(posX, posY, pos) {
    if (pos === 'middle') {
      console.log(this.shuffleArray[posX - 1][posY]);
      console.log(this.shuffleArray[posX + 1][posY]);
      console.log(this.shuffleArray[posX][posY - 1]);
      console.log(this.shuffleArray[posX][posY + 1]);
    }
  }
  shuffleArrayForPuzzle() {
    this.arrayForPuzzle.sort(() => Math.random() - 0.5);
    return this.arrayForPuzzle;
  }
  сhunkArray(array, chunk) {
    const newArray = [];
    for (let i = 0; i < array.length; i += chunk) {
      newArray.push(array.slice(i, i + chunk));
    }
    return newArray;
  }
}
export default MainPage;
