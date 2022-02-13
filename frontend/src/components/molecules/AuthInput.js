import React from 'react';
import styled from 'styled-components';

const AuthInput = ({ field, style, ...inputProps }) => (
  <Container
    style={style}
  >
    <InputBox>
      <Input
        {...inputProps}
      />
    </InputBox>
  </Container>
);

export default AuthInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


// const Input = styled.input`
//   font-size: 16px;
//   line-height: 23px;
//   color: rgba(0, 0, 0, 0.85);
//   padding: 10px;
//   outline: none;
  
//   border-radius: 10px;
//   border-bottom: 1px solid #DDDDDD;
//   &::placeholder {
//     color: #A3A3A3;
//   }
// `;
const InputBox = styled.div`
    box-sizing: border-box;
    width: 400px;
    border-bottom: 1px solid #C4C4C4;
    margin: 0 auto;
`
const Input = styled.input`
    display: inline-block;
    box-sizing: border-box;
    width: ${props => (props.width)};
    border: 0;
    outline: 0;
    padding-bottom: 7px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #5A5A5A;
    ::placeholder{
        color: #A3A3A3;
    }
`