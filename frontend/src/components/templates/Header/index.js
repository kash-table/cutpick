import React, { useState, useRef, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import styled, { css } from "styled-components"

import navigations from "./navigations"
import ShowLogin from "./ShowLogin"
import Logo from "../../../components/molecules/Logo"
// atoms
import Container from "../../atoms/Container"
import Text from "../../atoms/Text"
import isAdminAPI from '../../../api/auth/isAdmin'

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const onClickNavigationItem = (route) => history.push(route)
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(()=> {    
    const checkAdmin = async ()=>{
        const isShow = await isAdminAPI();
        console.log(isShow);
        if (isShow !== false)
          setIsAdmin(isShow.result.isAdmin)
    }
    checkAdmin();
  },[])
  return (
      <Wrapper>
        <Navigation>
            <LeftSide>
            <Logo/>
            <NavigationBar>
                {navigations.map(({ name, route }, index) => {
                return (
                    ((index !== 3 || isAdmin !== false) && (index !==2 || sessionStorage.getItem('jwt') !== null)) ?
                    <NavItem
                    key={`nav-${index}`}
                    current={pathname === route }
                    onClick={() => onClickNavigationItem(route)}
                    >
                    {name}
                    </NavItem>: <></>
                )
                })}
            </NavigationBar>
            </LeftSide>
            <RightSide>
                <ShowLogin />
            </RightSide>
        </Navigation>
      </Wrapper>
  )
}

export default Header

const Wrapper = styled.header`
  background-color: white;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 96px;
`

const Navigation = styled(Container)`
  display: flex;
  color: #5a5a5a;
  justify-content: space-between;
  padding: 28px 0;
  align-items: center;
`

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`

const RightSide = styled.div`
  display: flex;
  position: relative;
`

const NavigationBar = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 0.8rem;
`

const NavItem = styled(Text)`
  margin-right: 44px;
  padding-top: 7px;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  color: #5a5a5a;
  font-size: 16px;
  ${({ current = false }) =>
    current &&
    css`
      border-color: #5c2715;
      color: #222222;
      font-weight: bold;
    `};
`