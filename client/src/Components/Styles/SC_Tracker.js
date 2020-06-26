import styled, { css } from 'styled-components';

export const Box = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 1.4em;
  color: #ffffff;
  background: rgb(220,20,60);
  background: linear-gradient(90deg, rgba(220,20,60,1) 0%, rgba(249,3,3,0.7791491596638656) 97%);
  padding: 7px;
  border-top-left-radius: .25em;
  border-top-right-radius: .25em;
`;

export const Heading = styled.div`
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
  margin-top: 8px;
`;

export const Field = styled.div`
  font-size: 1.2em;
  font-weight: 300;
`;

export const CounterDiv = styled.div`
  font-size: 1.8em;
  font-weight: bold;
  ${props => (props.selected === 'cases') && css`
    color: #f16010;
  `};
  ${props => (props.selected === 'death') && css`
    color: #cc071e;
  `};
`;
