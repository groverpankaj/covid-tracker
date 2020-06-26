import styled from 'styled-components';

export const RadioContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  border-radius: .25rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 0.9em;
  font-weight: 600;
  color: #344191;
  padding: 20px;
  border-top: 1px dotted #dddddd;
  @media (max-width: 1091px) {
      margin-left: 5%;
      margin-right: 5%;
  }
`;



export const RadioDiv = styled.div`
  white-space: nowrap;
`;