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

    this.arrayForPuzzle = Array.from({ length: 16 }, (_, i) => i).sort(() => Math.random() - 0.5);
    this.shuffleArray = this.сhunkArray(this.arrayForPuzzle, 4);

    this.soundControler = new SoundControler();
    this.soundControler.checkBox.checked = true;
    this.count = new Count();
    this.buttonStart = new Button({ text: 'Shuffle and start', className: 'button' }).element;
    this.buttonStop = new Button({ text: 'Stop', className: 'button' }).element;
    this.buttonSave = new Button({ text: 'Save', className: 'button' }).element;
    this.buttonResult = new Button({ text: 'Result', className: 'button' }).element;
    this.grid = new Grid(this.shuffleArray);
    this.render();
    this.addEventListenerToButtonStart();
    this.addEventListenerToButtonStop();
    this.addEventListenerToButtonSave();
    this.addEventListenerToButtonResult();
    this.addEventListenerToGridWrapper();
    this.addEventListenerToWrapperButtons();
    this.dragDrop();
    // this.addEventListenerToInputCheckbox();
    setInterval(() => {
      this.count.spanTextTimeCount.innerHTML = this.count.countTime++;
    }, 1000);
  }

  dragDrop() {
    const dragItems = document.querySelectorAll('.tile');
    const dragZone = document.querySelectorAll('.empty-tile');
    dragItems.forEach((item) => {
      item.addEventListener('dragstart', (e) => {
        e.target.style.transition = '0s';
        e.dataTransfer.setData('elem', e.target.textContent);
      });
    });
    dragZone.forEach((item) => {
      item.addEventListener('dragenter', (e) => {
        e.preventDefault();
      });
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        // console.log();e.dataTransfer.getData('elem')
        document.querySelectorAll('*').forEach((elem) => {
          if (elem.textContent === e.dataTransfer.getData('elem')) {
            this.checkPositionTils(e.dataTransfer.getData('elem'), elem);
          }
        });
        // this.checkPositionTils();
      });
    });
  }
  render() {
    const body = document.querySelector('body');
    this.buttonsWrapperControl.append(this.buttonStart, this.buttonStop, this.buttonSave, this.buttonResult);
    this.buttonsWrapperSize.append(
      new Button({ text: '3x3', className: 'button-size' }).element,
      new Button({ text: '4x4', className: 'button-size' }).element,
      new Button({ text: '5x5', className: 'button-size' }).element,
      new Button({ text: '6x6', className: 'button-size' }).element,
      new Button({ text: '7x7', className: 'button-size' }).element,
      new Button({ text: '8x8', className: 'button-size' }).element
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
        this.shuffleArray = this.сhunkArray(this.arrayForPuzzle, Math.sqrt(sumTiles));
        this.grid.renderTiles(this.shuffleArray);
      }
    });
  }
  addEventListenerToGridWrapper() {
    this.grid.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('tile')) {
        this.player.currentTime = 0;
        this.count.countStep++;
        this.count.spanTextStepsCount.innerHTML = this.count.countStep;
        this.checkPositionTils(e.target.textContent, e.target);
      }
    });
  }
  addEventListenerToButtonStart() {
    this.buttonStart.addEventListener('click', () => {
      this.shuffleArray = this.сhunkArray(this.arrayForPuzzle, 4);
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
  checkPositionTils(textTile, elementFrom) {
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
      this.checkTils(posX, posY, elementFrom);
    }
  }
  checkTils(posX, posY, elFrom) {
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
          if (this.shuffleArray[objPosition[i][0]][objPosition[i][1]] === 0) {
            if (this.soundControler.checkBox.checked === false) {
              this.player.muted = true;
            } else {
              this.player.muted = false;
              this.player.pause();
              this.player.play();
            }

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

            if (i === 'top') {
              elFrom.style.top = `${+elFrom.style.top.split('%')[0] - 100 / this.shuffleArray[0].length}%`;
            }
            if (i === 'bottom') {
              elFrom.style.top = `${+elFrom.style.top.split('%')[0] + 100 / this.shuffleArray[0].length}%`;
            }
            if (i === 'left') {
              elFrom.style.left = `${+elFrom.style.left.split('%')[0] - 100 / this.shuffleArray[0].length}%`;
            }
            if (i === 'right') {
              elFrom.style.left = `${+elFrom.style.left.split('%')[0] + 100 / this.shuffleArray[0].length}%`;
            }
          }
        }
      }
    }
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

// console.log(this.shuffleArray[objPosition[i][0]][[objPosition[i][1]]]);
