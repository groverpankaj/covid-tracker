import React, { Component } from 'react';

class Counter extends Component {

  state = {
    start: parseInt(this.props.start),
    end: parseInt(this.props.end),
    display: parseInt(this.props.start),
    step: 1
  }

  componentDidMount() {

    let length = (this.state.end - this.state.start).toString().length;

    let step = 1;
    if (length > 3) {
      step = 10 ** (length - 2)
    }

    this.setState({
      step: step
    }
      , () => this.check()
    );
  }

  check = () => {
    if (this.state.display < this.state.end) {
      this.runCounter()
    }
  }

  runCounter() {

    setTimeout(() => {
      this.setState({
        display: ((this.state.display + this.state.step) < this.state.end) ? this.state.display + this.state.step : this.state.end
      }
        , () => this.check()
      )
    }, 25)
  }

  render() {
    return (
      <div>
        {(this.state.display).toLocaleString()}
      </div>
    );
  }
}


export default Counter;