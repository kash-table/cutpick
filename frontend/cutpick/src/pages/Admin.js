import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux"
import styled from "styled-components"

import Container from "../components/atoms/Container";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import SmallButton from "../components/atoms/SmallButton"
import sampleImage from "../assets/background.jpg";
import starImage from "../assets/star.png";
import commentImage from "../assets/comment.png";


const Admin = () => {
    const history = useHistory();
    const [designerList, setDesignerList] = useState([
        {
            id: 1,
            image: sampleImage,
            name: "이준호",
            location: "서울",
            star: 5,
        },
        {
            id: 2,
            image: sampleImage,
            name: "이준호",
            location: "경기도",
            star: 4,
        },
        {
            id: 3,
            image: sampleImage,
            name: "이준호",
            location: "부산",
            star: 3,
        },
    ])
    const designerCreate = () => {
        history.push (`/designer/create`);
    }
    const designerUpdate = (id) => {
        history.push (`/designer/update/${id}`);
    }
    const designerDelete = (id) => {
        history.push (`/designer/delete/${id}`);
    }
    
    return (
        <ContainerAdmin>
            <Button text="디자이너 등록" width={"200px"} height={"60px"} onClick={designerCreate} ></Button>
            <DesignerList>
                {designerList.map((deginer, idx) => (
                    <DesignerBox>
                        <DesignerImage src={sampleImage}/>
                        <DesignerIntro>
                            <Name>{deginer.name} 디자이너님</Name>
                            <Icon src={starImage}/><InfoText>{deginer.star}</InfoText>
                            <Icon src={commentImage}/><InfoText>{deginer.star}</InfoText>
                            <Location>{deginer.location}에서 주로 근무하고 있습니다.</Location>
                            
                            <SmallButton text="삭제" width={"100px"} height={"30px"} onClick={() => designerDelete(deginer.id)}/>
                            <SmallButton text="수정" width={"100px"} height={"30px"} onClick={() => designerUpdate(deginer.id)}/>
                            
                        </DesignerIntro>
                    </DesignerBox>
                ))}
            </DesignerList>
        </ContainerAdmin>
    )
}
export default Admin

const ContainerAdmin = styled(Container)`
    margin-top: 40px;
`
const Icon = styled.img`
    width: 18px;
    height: 18px;
`
const DesignerList = styled.div`
    
`
const DesignerBox = styled.div`
    padding: 20px 0px;
    border-bottom: 1px solid #343434;
    display: flex;
    flex-wrap: wrap;
`
const DesignerIntro = styled.div`
    width: calc(100% - (240px));
    padding: 0px 20px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
`
const DesignerImage = styled.img`
    width: 200px;
    height: 200px;
`
const InfoText = styled(Text)`
    font-size: 24px;
    line-height: 24px;
    font-weight: 300;
    margin: 0px 15px 0px 5px;
`
const Name = styled(Text)`
    font-size: 24px;
    line-height: 60px;
    display: block;
    font-weight: bold;
`
const Location = styled(Text)`
    font-size: 18px;
    line-height: 60px;
    font-color: #eeeeee;
    display: block;
    font-weight: 450;
`