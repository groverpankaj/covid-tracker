import styled, { css } from 'styled-components';

export const Tabcontainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  background-color: #4285f4;
  justify-content: space-between;
`;


export const TabcontainerChildDiv = styled.div`
  color: #ffffff;
  width: 25%;
  line-height: 40px;
  text-align: center;
  font-size: 1.0em;
  font-weight: 300;
  text-transform: uppercase;
  cursor: pointer;
  padding: 10px 10px;
  ${props => props.small && css`
    width: 50%;
    padding: 5px 10px;
  `};
  @media (max-width: 700px) {
    width: 50%;
    padding: 5px 10px;
  }
`;

export const TabLinks = styled.button`
  display: inline-block;
  width: 100%;
  color: #ffffff;
  background-color: #4285f4;
  border: 0;
  border-radius: 0.25em;
  ${props => props.selected && css`
    background-color: #346ac3;
  `};
  &:hover {
    color: #000000;
  }
  &:focus {
    outline:0;
  }
`;
