import { Observable } from "rxjs"

export class Timer {
  currentTime = 0
  isStart = false
  isPause = false
  intervalId: any
  timeout$: Observable<number>
  isTimeOut = false

  constructor() {
    this.timeout$ = new Observable(e => {
      e.next(1)
    })
  }
  startCountDown() {
    this.isStart = true
    this.intervalId = setInterval(() => {
      if (!this.isPause) {
        this.currentTime--
        // console.log(this.currentTime)
        if (this.currentTime === 0) {
          this.isTimeOut = true
          clearInterval(this.intervalId)
        }
      }
    }, 1000)
  }
  pause() {
    this.isPause = true
  }
  unPause() {
    this.isPause = false
  }
  clean() {

  }
}
