import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Container from "../../components/atoms/Container"
import AuthInput from "../../components/molecules/AuthInput"
import styled from "styled-components"
import Button from '../../components/atoms/Button';
import SmallButton from "../../components/atoms/SmallButton"
const DesignerView = ({match}) => {
    const history = useHistory();
    const [name, setName] = useState('이준호');
    const [phone, setPhone] = useState('01025767806');
    const [location, setLocation] = useState('서울');
    // const [imageFile, setImageFile] = useState(null);
    // const [imageName, setImageName] = useState('');
    const [previewURL, setPreviewURL] = useState(null);
    useEffect(()=> {

    },[]);
    return(
        <>
        <ContainerBox>
            <Title>디자이너 정보</Title>
            <ProfileBox>
                    <Label>프로필 사진</Label>
                    <ProfileImage src={previewURL}/>
            </ProfileBox>
            <InfomationBox>
                <Label>아이디</Label>
                <LabelText style={{ marginBottom: 20 }}>
                    {match.params.id}
                </LabelText>
                <Label>이름</Label>
                <LabelText style={{ marginBottom: 20 }}>
                    {name}
                </LabelText>
                <Label>휴대폰</Label>
                <LabelText style={{ marginBottom: 20 }}>
                    {phone}
                </LabelText>
                <Label>근무 지역</Label>
                <LabelText style={{ marginBottom: 20 }}>
                    {location}
                </LabelText>
            </InfomationBox>
        </ContainerBox>
        <Button text="목록으로" width={"208px"} height={"60px"} onClick={() => history.goBack()}/>
        </>
    )
}
export default DesignerView;

const ContainerBox = styled(Container)`
    padding-bottom: 20px;
    border-bottom: 2px solid #444444;
    margin-bottom: 20px;
`
const InfomationBox = styled.div`
    float: left;
    width: 50%;
`
const Title = styled.p`
    font-weight: 600;
    font-size: 30px;
    line-height: 14px;
    color: #000000;
    text-align: center;
    padding-bottom: 60px;
    border-bottom: 2px solid #444444;
`
const Label = styled.p`
    font-weight: 600;
    font-size: 18px;
    line-height: 14px;
    width: 400px;
    text-align: left;
    margin: 0 auto;
    padding: 20px 0px;
`
const LabelText = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 14px;
    width: 400px;
    text-align: left;
    margin: 0 auto;
    padding: 20px 0px;
    border-bottom: 1px solid black;
    color: #666666;
`
const ProfileBox = styled.div`
    width: 50%;
    float: left;
    text-align: center;
`
const ProfileImage = styled.img`
    width: 300px;
    height: 300px;
    object-fit: contain;
`