import styled from 'styled-components';

export const FootContainer = styled.div` 
  background-color: #3f51b5;
  color: #ffffff;
  font-size: 0.9em;
  text-align: center;
`;

export const NavContainer = styled.div` 
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  max-width: 600px;
  padding: 2.0em 0 1.0em 0;
  @media (max-width: 700px) {
    padding: 2.0em 1.0em 1.0em 1.0em; 
  }
`;


export const NavText = styled.span`
  text-transform: uppercase;
  color: #ffffff;
`;

export const HrLine = styled.hr`
  margin: 0 15%;
  background-color: #aaaaaa;
`;

export const DisclaimerText = styled.div`
  color: #a6abc5;
  font-size: 0.8em;
  margin: 1.0em 18%;
  @media (max-width: 700px) {
    margin: 1.0em 5%; 
  }
`;

export const DisclaimerLink = styled.a`
  color: #ffffff;
  &:hover {
    color: #ffffff;
    text-decoration: none;
  }
`;

export const DisclaimerBottom = styled.div`
  color: #b3b4b7;
  padding: 1.0em 0;
  background-color: #344191;
`;