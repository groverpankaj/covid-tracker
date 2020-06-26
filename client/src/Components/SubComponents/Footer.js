import React from 'react';
import { FootContainer, FooterHead, NavContainer,  NavText, HrLine, DisclaimerText, DisclaimerLink, DisclaimerBottom } from '../Styles/SC_Footer';


const Footer = () => {

  return(

    <FootContainer>

      <NavContainer>
        <a href="/"><NavText>Home</NavText></a>
        <a href="/world"><NavText>World</NavText></a>
        <a href="/country"><NavText>Country</NavText></a>
        <a href="/compare"><NavText>Compare</NavText></a>
      </NavContainer>

      <HrLine></HrLine>

      <DisclaimerText>
        All the information on this website is published in good faith and for general information purpose only. This website does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website, is strictly at your own risk. The website developers will not be liable for any losses and/or damages in connection with the use of this website. By using our website, you hereby consent to our disclaimer and agree to its terms.
      </DisclaimerText>

      <DisclaimerBottom>
        &#169; 2020 Copyright: <DisclaimerLink href="https://www.linkedin.com/in/pgrover9/" target="_blank">Pankaj Gover</DisclaimerLink>
      </DisclaimerBottom>

    </FootContainer>
  );

}

export default Footer;


