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

import isAdminAPI from "../api/auth/isAdmin"
import getDesignerList from "../api/designer/getDesignerList"
import deleteDesigner from "../api/designer/deleteDesigner"
import getRatingById from "../api/review/getRatingById";

const Admin = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    useEffect(()=> {    
        const checkAdmin = async ()=>{
            if (sessionStorage.getItem('jwt') == null)
            {
                document.location.href = "/";
                alert("잘못된 접근입니다.")
                return;
            }
            const isShow = await isAdminAPI();
            console.log("isShow", isShow);
            console.log("test");
            if (isShow === false || !isShow.result.isAdmin)
            {
                document.location.href = "/";
                alert("잘못된 접근입니다.")
                return;
            }
            const List = await getDesignerList();
            console.log("list", List);
            setDesignerList(List.map( (designer)=>{
                return ({
                    id: designer.id,
                    image: `${process.env.REACT_APP_BACKEND_API_URL}/img/${designer.pictureUrl}`,
                    name: designer.name,
                    location: designer.location,
                    star: designer.star.toFixed(2),
                    count: designer.count,
                    cut: designer.cut,
                    color: designer.color,
                    purm: designer.purm,
                })
            }))

            setLoading(true);
        }
        checkAdmin();
    },[])
    const [designerList, setDesignerList] = useState([
        {
            id: 1,
            image: sampleImage,
            name: "이준호",
            location: "서울",
            star: 5,
        },
    ])
    const designerCreate = () => {
        history.push (`/designer/create`);
    }
    const designerUpdate = (id) => {
        history.push (`/designer/update/${id}`);
    }
    const designerDelete = async (id) => {
        const result = await deleteDesigner(id);
        console.log(result);
        alert("삭제 완료");
        document.location.href = "/admin";

    }
    
    return (
        (loading)?
        <ContainerAdmin>
            <Button text="디자이너 등록" width={"200px"} height={"60px"} onClick={designerCreate} ></Button>
            <DesignerList>
                {designerList.map((deginer, idx) => (
                    <DesignerBox>
                        <DesignerImage src={deginer.image}/>
                        <DesignerIntro>
                            <Name>{deginer.name} 디자이너님</Name>
                            <Icon src={starImage}/><InfoText>{deginer.star}</InfoText>
                            <Icon src={commentImage}/><InfoText>{deginer.count}</InfoText>
                            <Location>{deginer.location}에서 주로 근무하고 있습니다.</Location>
                            
                            <SmallButton text="삭제" width={"100px"} height={"30px"} onClick={() => designerDelete(deginer.id)}/>
                            <SmallButton text="수정" width={"100px"} height={"30px"} onClick={() => designerUpdate(deginer.id)}/>
                            
                        </DesignerIntro>
                    </DesignerBox>
                ))}
            </DesignerList>
        </ContainerAdmin>
        :<></>
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