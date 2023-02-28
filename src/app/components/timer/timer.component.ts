import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  @Output() onSendTime = new EventEmitter<string>();
  @Output() onSendMili = new EventEmitter<number>();

  ml: number = 0;
  display: string = "00m:00s:000ms"
  lastUpdated: number = performance.now()

  timerInterval:any = null;

  sendTimeToParent() {
    this.onSendTime.emit(this.display)
  }

  sendMiliToParent() {
    this.onSendMili.emit(this.ml)
  }

  startTimer() {
    clearInterval(this.timerInterval)
    this.lastUpdated = performance.now()
    this.timerInterval = setInterval(() => {
      this.updateTimer()
    }, 10)
  }

  pauseTimer() {
    this.sendMiliToParent()
    clearInterval(this.timerInterval)
  }

  resetTimer() {
    this.ml = 0
    clearInterval(this.timerInterval)
    this.lastUpdated = performance.now()
    this.updateTimer()
  }

  updateTimer(): void {
    let now = performance.now()
    let time = now - this.lastUpdated
    this.lastUpdated = now;
    this.ml += time
    let minutes = Math.floor(this.ml / 60000).toString().padStart(2,"0")
    let seconds = Math.floor((this.ml % 60000 )/1000).toString().padStart(2,"0")
    let mili =  (this.ml % 1000).toString().padStart(3,"0")
    this.display = (minutes+"m:")+(seconds+"s:")+(mili+"ms")
    this.sendTimeToParent()
  }

}
