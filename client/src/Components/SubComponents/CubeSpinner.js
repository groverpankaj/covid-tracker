import React, { Component } from 'react';
import CubeSpinnerFace from './CubeSpinnerFace';
import formula from './formulas';

import { RotatingBox, Cube, FrontSide, RightSide } from '../Styles/SC_CubeSpinner';


class CubeSpinner extends Component {

  state = {
    spinnerClass: false,
    count: 0,
    data: [],
    cubeBottomPos: 15
  }


  componentDidUpdate(prevProps, prevState) {

    if(this.props !== undefined) {
     
      if ( (this.props.data.length !== prevState.data.length)) {
        
        let sortedByCountry = this.props.data.slice().sort(formula.sortCountryDesc); 
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
    // Cube Fixed position bottom to prevent cube over footer
    window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    const scrolled = winScroll / height;

    this.setState({
      cubeBottomPos: 15 + (scrolled*150)
    })
  }

  

  startRotation = () => {
    
    setTimeout(() => {
      this.setState({
        spinnerClass: true
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
      spinnerClass: false
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
      
      <RotatingBox bottom={this.state.cubeBottomPos}>
        <Cube id="cube" move={this.state.spinnerClass} onAnimationEnd={this.animationHasEnded}>
          <FrontSide id="front-side">
            <CubeSpinnerFace record = {record}></CubeSpinnerFace>
          </FrontSide>

          <RightSide id="right-side">
            <CubeSpinnerFace record = {nextRecord}></CubeSpinnerFace>
          </RightSide>

        </Cube>
      </RotatingBox>

    );
    } else {
      return(
        <div></div>
      );
    }

  }

}


export default CubeSpinner;