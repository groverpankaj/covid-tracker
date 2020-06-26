import styled from 'styled-components';

export const HeadRow = styled.tr`
  background: rgb(71,108,181);
  background: linear-gradient(0deg, rgba(71,108,181,1) 0%, rgba(130,161,223,0.927608543417367) 100%);
  color: #ffffff;
`;

export const RecordText = styled.tr`
  font-size: 1.1em;
  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
`;

export const Flag = styled.span`
  height: 32px;
  width: 32px;
  margin-top: 0px;
  padding-right: 10px;
`;
