import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import Container from "../components/atoms/Container"
import AuthInput from "../components/molecules/AuthInput"
import styled from "styled-components"
import Button from '../components/atoms/Button';

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

    const onSubmit = () => {
        alert("개인정보가 성공적으로 변경되었습니다.");
        history.push("/");
    }
    return (
        <Container>
            <InfomationBox>
                <Title>개인정보 수정</Title>
                <Label>아이디</Label>
                <AuthInput
                    field="아이디"
                    placeholder="아이디"
                    value={id}
                    onChange={onChangeId}
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
            </InfomationBox>
        </Container>
    )
}
export default Mypage

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