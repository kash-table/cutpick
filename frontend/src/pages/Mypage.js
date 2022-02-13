import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import Container from "../components/atoms/Container"
import AuthInput from "../components/molecules/AuthInput"
import styled from "styled-components"
import Button from '../components/atoms/Button';

import userGetInfo from "../api/user/userGetInfo"
import userUpdateInfo from "../api/user/userUpdateInfo"
import deleteUserAPI from "../api/user/deleteUser"
// import { useSelector } from "react-redux"

const Mypage = () => {
    const history = useHistory();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState('');

    const onChangeId = (e) => setId(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeNewPassword = (e) => setNewPassword(e.target.value);
    const onChangeNewPasswordCheck = (e) => setNewPasswordCheck(e.target.value);
    const onKeyDownPassword = (e) => (e.key === 'Enter') // && onSubmit();

    const onSubmit = async () => {
        const result = await userUpdateInfo(password, newPassword);
        if (result.success === true){
            alert(result.reason);
            history.push("/");
        } else {
            alert(result.reason);
        }
        
        
    }
    const deleteUser = async () => {
        const result = await deleteUserAPI();
        if (result.success === true)
        {
            alert("탈퇴 완료")
            sessionStorage.clear();
            document.location.href = "/";
        } else {
            alert("오류가 발생했습니다.\n다시 로그인 해주세요.")
        }
    }
    useEffect(()=> {
        const init = async () => {
            const userInfo = await userGetInfo();
            setId(userInfo.result.userId);
        }
        init();
    },[])
    return (
        <Container>
            <InfomationBox>
                <Title>개인정보 수정</Title>
                <Label>아이디</Label>
                <AuthInput
                    field="아이디"
                    placeholder="아이디"
                    value={id}
                    // onChange={onChangeId}
                    style={{ marginBottom: 20 }}
                />
                <Label>비밀번호</Label>
                <AuthInput
                    field="비밀번호"
                    placeholder="비밀번호"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    onKeyDown={onKeyDownPassword}
                    style={{ marginBottom: 20 }}
                />
                <Label>새 비밀번호</Label>
                <AuthInput
                    field="새 비밀번호"
                    placeholder="새 비밀번호"
                    type="password"
                    value={newPassword}
                    onChange={onChangeNewPassword}
                    onKeyDown={onKeyDownPassword}
                    style={{ marginBottom: 20 }}
                />
                <Label>새 비밀번호 확인</Label>
                <AuthInput
                    field="새 비밀번호 확인"
                    placeholder="새 비밀번호 확인"
                    type="password"
                    value={newPasswordCheck}
                    onChange={onChangeNewPasswordCheck}
                    onKeyDown={onKeyDownPassword}
                    style={{ marginBottom: 40 }}
                />
                <Button text="개인정보 변경" width={"400px"} onClick={onSubmit}></Button>
                <SignUpBox>
                    <Text>회원 탈퇴를 원하시나요?</Text>
                    <MoveLink onClick={deleteUser}>회원 탈퇴</MoveLink>
                </SignUpBox>
            </InfomationBox>
        </Container>
    )
}
export default Mypage
const SignUpBox = styled.div`
  text-align: center;
  margin-top: 20px;
`
const Text = styled.div`
  display: inline-block;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #A3A3A3;
`
const MoveLink = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  color: #5A5A5A;
  border-bottom: 1px solid #5A5A5A;
  margin-left: 3px;
  cursor: pointer;
`
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