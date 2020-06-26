import styled, { css, keyframes } from 'styled-components';


export const RotatingBox = styled.div`
  width: 120px;
  height: 90px;
  margin: 10px auto;
  perspective: 800px;
  position: fixed;
  bottom: ${props => props.bottom}px;
  left: 45%;

  @media (max-width: 991px) {
    left: 45%;
  }
  
  @media (max-width: 691px) {
    left: 38%;
  }
`;



const rotation = keyframes`
  0%{transform: rotateY(0)}
  100%{transform: rotateY(-90deg);}
`;

export const Cube = styled.div`
  width: 120px;
  background-color: #ffffff;
  color: #000000;
  vertical-align: middle;
  text-align: center;
  transform-style: preserve-3d;
  ${props => props.move && css`
    animation: ${rotation};
    animation-duration: 3s;
    animation-timing-function: linear;
  `};
`;

export const CubeChildDiv = styled.div`
  position: absolute;
  width: 120px;
  height: 100px;
  box-sizing: border-box;
  background-color: #ffffff;
`;

export const FrontSide = styled.div`
  transform: translateZ(60px);
`;

export const RightSide = styled.div`
  transform: rotateY(90deg) translateX(60px);
  transform-origin: right;
`;

export const SpinContainerBody = styled.div`
  position: relative !important;
`;

export const SpinContainerHead = styled.div`
  position: relative !important;
  height: 20px !important;
  font-size: 10px;
  color: #fff;
  font-weight: 500;
  background-color: #012c50 !important;
  position: relative;
  text-align: right;
  padding-right: 10px;
  padding-top: 3px;
`;


export const SpinContainerImageDiv = styled.div`
  margin-top: -20px;
  background: none !important;
  text-align: left;
  margin-left: 10px;
`;


export const SpinContainerImage = styled.img`
  src: url(${props => props.src});
  vertical-align: middle;
  border-style: none;
  height: 30px;
  width: 30px;
`;

export const SpinContainerHeadline = styled.div`
  height: 15px !important;
  text-align: center;
  display: block !important;
  font-size: 9px;
  color: #012c50;
  font-weight: 700;
  margin-top: 5px;
`;


export const SpinContainerCount = styled.div`
  display: block !important;
  height: 20px !important;
  font-size: 12px;
  color: #000;
  font-weight: 600;
`;

export const SpinContainerCountry = styled.div`
  height: 20px !important;
  text-align: center;
  display: block !important;
  font-size: 9px;
  color: #b03130;
  font-weight: 700;
  text-transform: uppercase;
`;