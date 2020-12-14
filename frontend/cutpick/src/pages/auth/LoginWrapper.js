import React from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Container from '../../components/atoms/Container';
import Text from '../../components/atoms/Text';

import logoImage from '../../assets/nav_logo.png';
// import brandIllust from '../../assets/illusts/brandIllust.png';

const LoginWrapper = ({ children }) => {
  const history = useHistory();

  return (
    <Wrapper>
        {children}
    </Wrapper>
  );
};

export default LoginWrapper;

const Wrapper = styled.div`
    border:1px solid #8F784B;
    padding: 40px;
    width: 400px;
    margin: 40px auto;
    
`;
