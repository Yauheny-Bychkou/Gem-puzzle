import Button from '../components/button/button';
import Count from '../components/count/count';
import Grid from '../components/grid/grid';
import SoundControler from '../components/soundContol/soundControler';

class MainPage {
  buttonsWrapperSize = document.createElement('div');
  buttonsWrapperControl = document.createElement('div');
  title = document.createElement('h1');
  player = document.createElement('audio');
  constructor() {
    this.player.setAttribute('src', 'track.mp3');
    this.title.innerHTML = 'RSS Gem Puzzle';
    this.buttonsWrapperSize.classList.add('size');
    this.buttonsWrapperControl.classList.add('control');
    this.arrayForPuzzle = Array.from({ length: 16 }, (_, i) => i);
    this.soundControler = new SoundControler();
    this.soundControler.checkBox.checked = true;
    this.count = new Count();
    this.buttonStart = new Button({ text: 'Shuffle and start', className: 'button' }).element;
    this.buttonStop = new Button({ text: 'Stop', className: 'button' }).element;
    this.buttonSave = new Button({ text: 'Save', className: 'button' }).element;
    this.buttonResult = new Button({ text: 'Result', className: 'button' }).element;
    this.shuffleArray = this.сhunkArray(this.shuffleArrayForPuzzle(), 4);
    this.grid = new Grid(this.shuffleArray);
    this.render();
    this.addEventListenerToButtonStart();
    this.addEventListenerToButtonStop();
    this.addEventListenerToButtonSave();
    this.addEventListenerToButtonResult();
    this.addEventListenerToGridWrapper();
    this.addEventListenerToWrapperButtons();
    // this.addEventListenerToInputCheckbox();
    setInterval(() => {
      this.count.spanTextTimeCount.innerHTML = this.count.countTime++;
    }, 1000);
  }
  // addEventListenerToInputCheckbox() {
  //   this.soundControler.checkBox.addEventListener('change', (e) => {
  //     //
  //   });
  // }
  render() {
    const body = document.querySelector('body');
    this.buttonsWrapperControl.append(this.buttonStart, this.buttonStop, this.buttonSave, this.buttonResult);
    this.buttonsWrapperSize.append(
      new Button({ text: '3x3', className: 'button' }).element,
      new Button({ text: '4x4', className: 'button' }).element,
      new Button({ text: '5x5', className: 'button' }).element,
      new Button({ text: '6x6', className: 'button' }).element,
      new Button({ text: '7x7', className: 'button' }).element,
      new Button({ text: '8x8', className: 'button' }).element
    );
    body.append(
      this.title,
      this.buttonsWrapperControl,
      this.count.element,
      this.grid.element,
      this.soundControler.element,
      this.buttonsWrapperSize
    );
  }
  addEventListenerToWrapperButtons() {
    this.buttonsWrapperSize.addEventListener('click', (e) => {
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
        document.querySelectorAll('.grid > div').forEach((item) => {
          if (item.textContent === '') {
            this.player.currentTime = 0;
            this.player.pause();
            this.player.play();
            this.count.countStep++;
            this.count.spanTextStepsCount.innerHTML = this.count.countStep;
            this.checkPositionTils(e.target.textContent, e.target, item);
          }
        });
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
  checkPositionTils(textTile, elementFrom, elementTo) {
    let posX = 0;
    let posY = 0;
    if (textTile !== '') {
      for (let i = 0; i < this.shuffleArray.length; i++) {
        for (let j = 0; j < this.shuffleArray[i].length; j++) {
          if (this.shuffleArray[i][j] === +textTile) {
            posX = i;
            posY = j;
          }
        }
      }
      this.checkTils(posX, posY, elementFrom, elementTo);
    }
  }
  checkTils(posX, posY, elFrom, elTo) {
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
          if (!this.shuffleArray[objPosition[i][0]][[objPosition[i][1]]]) {
            if (this.soundControler.checkBox.checked === false) {
              this.player.muted = true;
            } else this.player.muted = false;
            const elementFrom = {
              x: posX,
              y: posY,
              value: this.shuffleArray[posX][[posY]],
            };
            const elementTo = {
              x: objPosition[i][0],
              y: objPosition[i][1],
              value: this.shuffleArray[objPosition[i][0]][[objPosition[i][1]]],
            };
            this.shuffleArray[elementFrom.x][elementFrom.y] = elementTo.value;
            this.shuffleArray[elementTo.x][elementTo.y] = elementFrom.value;
            elFrom.innerHTML = '';
            elTo.innerHTML = elementFrom.value;
          }
        }
      }
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
