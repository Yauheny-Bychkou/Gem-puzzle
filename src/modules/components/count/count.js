class Count {
  element = document.createElement('div');
  spanTextSteps = document.createElement('span');
  spanTextStepsCount = document.createElement('span');
  spanTextTime = document.createElement('span');
  spanTextTimeCount = document.createElement('span');
  spansecond = document.createElement('span');
  constructor() {
    this.spansecond.innerHTML = ' c';

    this.countStep = localStorage.getItem('steps') ? localStorage.getItem('steps') : 0;
    this.countTime = localStorage.getItem('time') ? localStorage.getItem('time') : 0;
    this.spanTextSteps.innerHTML = 'Steps: ';
    this.spanTextStepsCount.innerHTML = this.countStep;
    this.spanTextTime.innerHTML = 'Time: ';
    this.spanTextTimeCount.innerHTML = this.countTime;
    this.element.classList.add('count');
    this.spanTextStepsCount.classList.add('count-step');
    this.element.append(
      this.spanTextSteps,
      this.spanTextStepsCount,
      this.spanTextTime,
      this.spanTextTimeCount,
      this.spansecond
    );
  }
}
export default Count;
