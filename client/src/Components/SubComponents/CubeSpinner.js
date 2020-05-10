import React, { Component } from 'react';
import Style from '../Styles/CubeSpinner.module.css';
import CubeSpinnerFace from './CubeSpinnerFace';


class CubeSpinner extends Component {

  state = {
    spinnerClass: Style.Cube,
    count: 0,
    data: []
  }


  compare = ( a, b ) => {
    if ( a.country < b.country ){
      return -1;  
    }
    if ( a.country > b.country ){
      return 1;   
    }
    return 0;
  }


  componentDidUpdate(prevProps, prevState) {

    if(this.props !== undefined) {

      
     
      if ( (this.props.data.length !== prevState.data.length)) {

        let sortedByCountry = this.props.data.sort(this.compare ); 
        
        this.setState({
          data: sortedByCountry
        },
          () => {
          // console.log('State Set to ', this.state.data.length  ,' records', this.state.data[0]['country']);
          this.startRotation();
        }
        )
      }
    }
 }

  componentDidMount() {
    // console.log(this.props);
    // this.startRotation();
  }

  

  startRotation = () => {

    setTimeout(() => {
      this.setState({
        spinnerClass: [Style.Cube, Style.Move].join(' ')
      })
    }, 700);
  }


  animationHasEnded = () => {
  
    let count = this.state.count + 1;
    if (count >= this.state.data.length) {
      count = 0;
    }

    this.setState({
      count: count,
      spinnerClass: [Style.Cube].join(' ')
    },
     () => this.startRotation()
    )
  }

  render() {
    if (this.state.data.length > 0) {
      let record;
      let nextRecord;
      if (this.state.count < this.state.data.length-1) {
        record = (this.state.data[this.state.count]);
        nextRecord = (this.state.data[this.state.count+1]);
      }  else {
        
        record = (this.state.data[this.state.count]);
        nextRecord = (this.state.data[0]);
      }
      
    return(
      
      <div className={Style.RotatingBox}>
        <div className={this.state.spinnerClass} id="cube" onAnimationEnd={this.animationHasEnded}>

          <div className={Style.FrontSide} id="front-side">
            <CubeSpinnerFace record = {record}></CubeSpinnerFace>
          </div>

          <div className={Style.RightSide} id="right-side">
          <CubeSpinnerFace record = {nextRecord}></CubeSpinnerFace>
          </div>

        </div>
      </div>

    );
    } else {
      return(
        <div></div>
      );
    }

  }

}


export default CubeSpinner;