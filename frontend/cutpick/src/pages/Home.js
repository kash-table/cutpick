import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
// import { useSelector } from "react-redux"

import backgroundImage from "../assets/background.jpg";
import Text from "../components/atoms/Text";

const Home = () => {
  const history = useHistory()

  return (
        <Background>
            <Image src={backgroundImage}/>    
            <IntroBox>
                <HomeIntro>
                    CUT PICK,<br />
                    최고의 미용사를 만나보세요!
                </HomeIntro>
            </IntroBox>
        </Background>
  )
}

const Background = styled.div`
    height: 100%;
    overflow: hidden;
    width:100%;
    position: absolute;
`
const IntroBox = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: rgba( 0, 0, 0, 0.5 );
`
const HomeIntro = styled(Text)`
    left: 240px;
    top: 240px;
    position: absolute;
    display: inline-block;
    font-weight: 500;
    font-size: 36px;
    font-color: white;
    line-height: 72px;
    color: #FEFEFE;
`
const Image = styled.img`
    margin: 0px;
    object-fit: cover;
    width: 100%;
`
export default Home