import React, { useState, useRef } from "react"
import { useHistory, useLocation } from "react-router-dom"
import styled, { css } from "styled-components"

import navigations from "./navigations"
import Logo from "../../molecules/Logo"
// atoms
import Container from "../../atoms/Container"
import Text, { TextWithLink } from "../../atoms/Text"

const ShowLogin = () => {
  let token = sessionStorage.getItem("jwt");
  if (token != null)
    return (
      <LoginText href="/auth/logout">Logout</LoginText>
    )
  else
    return (
      <LoginText href="/auth/">Login</LoginText>
    )
}

export default ShowLogin;

const LoginText = styled(TextWithLink)`
  display: flex;
  color: #5a5a5a;
  justify-content: space-between;
  padding: 28px 0;
  align-items: center;
  border-color: #5c2715;
  color: #222222;
  font-weight: bold;
`

