import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import Container from "../../components/atoms/Container"
import AuthInput from "../../components/molecules/AuthInput"
import styled from "styled-components"
import Button from '../../components/atoms/Button';

// import { useSelector } from "react-redux"

const DesignerCreate = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageName, setImageName] = useState('');
    const [previewURL, setPreviewURL] = useState(null);
    const onChangeName = (e) => setName(e.target.value);
    const onChangeLocation = (e) => setLocation(e.target.value);
    const onKeyDownLocation = (e) => (e.key === 'Enter') // && onSubmit();

    const onSubmit = () => {
        alert("디자이너 정보가 성공적으로 등록되었습니다.");
        history.push("/admin");
    }

    const handleFileInput = (e) => {
        let reader = new FileReader();
        e.preventDefault();
        reader.onloadend = () => {
            setImageFile(e.target.files[0]);
            setImageName(e.target.value);
            setPreviewURL(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
        console.log(imageFile);
    }
    
    const handlePost = () => {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
    }

    return (
        <Container>
            <InfomationBox>
                <Title>디자이너 등록</Title>
                <Label>이름</Label>
                <AuthInput
                    field="이름"
                    placeholder="이름"
                    value={name}
                    onChange={onChangeName}
                    style={{ marginBottom: 20 }}
                />
                <Label>근무 지역</Label>
                <AuthInput
                    field="근무지역"
                    placeholder="근무지역"
                    
                    value={location}
                    onChange={onChangeLocation}
                    onKeyDown={onKeyDownLocation}
                    style={{ marginBottom: 20 }}
                />
                
                <ProfileBox>
                <Label>프로필 사진 <ProfileLoadButton for="file">불러오기 {imageName != '' ? `(${imageName})` : ``}</ProfileLoadButton></Label>
                    <HiddenInput type="file" id="file" onChange={(e) => handleFileInput(e)}/>
                    
                        <ProfileImage src={previewURL}/>: <></>
                    
                    {/* <button type="button" onClick={() => handlePost()}>Submit</button> */}
                </ProfileBox>
                <Button text="등록 완료" width={"400px"} onClick={onSubmit}></Button>
            </InfomationBox>
        </Container>
    )
}
export default DesignerCreate

const InfomationBox = styled.div`
    padding-top: 40px;
`
const Title = styled.p`
    font-weight: 600;
    font-size: 30px;
    line-height: 14px;
    color: #000000;
    text-align: center;
    padding-bottom: 60px;
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
const ProfileBox = styled.div`
    text-align: center;
    margin-bottom: 20px;
`
const ProfileLoadButton = styled.label`
    font-weight: 300;
    font-size: 14px;
    line-height: 14px;
    width: 400px;
    text-align: left;
    margin: 0 auto;
    padding: 20px 0px;
    color: #A4A4A4;
`
const HiddenInput = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
`
const ProfileImage = styled.img`
    width: 300px;
    height: 300px;
    object-fit: contain;
`