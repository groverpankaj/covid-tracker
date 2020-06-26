import styled from 'styled-components';


export const NavContainer = styled.div`
  display: flex;
  align-items: stretch;
  background-color: #47475C;
`;

export const NavDiv = styled.div`
  background-color: #47475C;
  color: #eeeaea;
  width: 100%;
  height: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 1.2em;
  text-transform: uppercase;
  flexGlow: 1;
  &:hover {
    background-color: #5B6B7A;
  color: #000000;
  text-decoration: none;
  }
`;


export const NavText = styled.span` 
  display: inline-block;
  width: 100%;
  border-right: 1px dotted #ffffff;
  color: #ffffff;
`;
