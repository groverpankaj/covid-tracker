import React from 'react';
import { Link } from 'react-router-dom';
import { NavContainer, NavDiv, NavText } from '../Styles/SC_Navbar';

const Navbar = () => {

  return(
    <NavContainer>
      <NavDiv>
        <Link to="/"><NavText>Home</NavText></Link>
      </NavDiv>
      <NavDiv>
        <Link to="/world"><NavText>World</NavText></Link>
      </NavDiv>
      <NavDiv>
        <Link to="/country"><NavText>Country</NavText></Link>
      </NavDiv>
      <NavDiv>
        <Link to="/compare"><NavText>Compare</NavText></Link>
      </NavDiv>
    </NavContainer>
  );

}

export default Navbar;