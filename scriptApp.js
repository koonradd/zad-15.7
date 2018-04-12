class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      miliseconds: 0,
      seconds: 0,
      minutes: 0
    };

    this.stop = this.stop.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);

    this.format = this.format.bind(this);
    this.getMiliseconds = this.getMiliseconds.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
    this.getMinutes = this.getMinutes.bind(this);
    this.pad0 = this.pad0.bind(this);
  }

  getMiliseconds() {
    return this.state.miliseconds;
  }

  getSeconds() {
    if (this.state.miliseconds >= 100) {
      this.state.miliseconds = 0;
      this.setState({
        seconds: (this.state.seconds += 1)
      });
    } else {
      return this.state.seconds;
    }
  }

  getMinutes() {
    if (this.state.seconds >= 60) {
      this.state.seconds = 0;
      this.setState({
        minutes: (this.state.minutes += 1)
      });
    } else {
      return this.state.minutes;
    }
  }

  reset() {
    this.setState({
      miliseconds: (this.state.miliseconds = 0),
      seconds: (this.state.seconds = 0),
      minutes: (this.state.minutes = 0)
    });
  }

  format(minuts, seconds, miliseconds) {
    return (
      this.pad0(minuts) +
      ":" +
      this.pad0(seconds) +
      ":" +
      this.pad0(miliseconds)
    );
  }

  pad0(value) {
    if (value.toString().length < 2) {
      return (value = "0" + value);
    } else {
      return value;
    }
  }

  start() {
    this.watch = setInterval(() => {
      this.setState({
        miliseconds: this.state.miliseconds + 1
      });
    }, 10);
  }

  stop() {
    clearInterval(this.watch);
  }

  render() {
    return (
      <div id="timer">
        <nav className="constrols">
          <a href="#" className="button" onClick={this.start}>
            start
          </a>
          <a href="#" className="button" onClick={this.stop}>
            stop
          </a>
          <a href="#" className="button" onClick={this.reset}>
            reset
          </a>
        </nav>
        <div className="stopwatch">
          {this.format(
            this.getMinutes(),
            this.getSeconds(),
            this.getMiliseconds()
          )}
        </div>
        <ol type="1" id="results" />
      </div>
    );
  }
}

ReactDOM.render(<Stopwatch />, document.getElementById("App"));
