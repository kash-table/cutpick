import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AuthInput from '../../components/molecules/AuthInput';
import Logo from '../../assets/nav_logo.png';
import Button from '../../components/atoms/Button';
// import { login } from '../../store/auth/actions';
import SignUpAPI from '../../api/user/signUp'

const SignUp = () => {
    const history = useHistory();
    //   const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    //   const [isLoginPending, setIsLoginPending] = useState(false);
    
    const onChangeId = (e) => setId(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangePasswordCheck = (e) => setPasswordCheck(e.target.value);
    const onKeyDownPassword = (e) => (e.key === 'Enter') && onSubmit();
    const onKeyDownPasswordCheck = (e) => (e.key === 'Enter') && onSubmit();

    const onSubmit = async () => {
        if (password !== passwordCheck){
            alert("두 비밀번호가 일치하지 않습니다.")
            return;
        }
        const result = await SignUpAPI(id, password);
        if (result.success === true){
            alert("가입 완료")
            history.push('/auth/login');
        }
        else{
            alert("가입하는 과정에 오류가 발생했습니다.")
        }
        //     if (isLoginPending) {
        //       return;
        //     }

        //     setIsLoginPending(true);
        //     const callbackOnSuccess = () => {
        //       history.push('/');
        //       // setIsLoginPending(false); // tempRemove
        //     };
        //     dispatch(login({ email, password, callbackOnSuccess }));
        //     setIsLoginPending(false); // tempUse
    };

    return (
        <>
            <LogoBox>
                <Link to="/">
                    <Image src={Logo} alt="Logo" />
                </Link>
            </LogoBox>
            <Label>회원가입</Label>
            <AuthInput
                field="아이디"
                placeholder="아이디"
                value={id}
                onChange={onChangeId}
                style={{ marginBottom: 45 }}
            />
            <AuthInput
                field="비밀번호"
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={onChangePassword}
                onKeyDown={onKeyDownPassword}
                style={{ marginBottom: 45 }}
            />
            <AuthInput
                field="비밀번호 확인"
                placeholder="비밀번호 확인"
                type="password"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
                onKeyDown={onKeyDownPasswordCheck}
                style={{ marginBottom: 55 }}
            />
            <Button text="가입하기" width={"360px"} onClick={onSubmit}></Button>
        </>
    );
};

const SignUpBox = styled.div`
  text-align: center;
  margin-top: 20px;
`
const Label = styled.div`
  display: inline-block;
  width: 400px;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  line-height: 14px;
  padding-bottom: 40px;
  margin-bottom: 80px;
  border-bottom: 2px solid #E5E5E5;
  color: #A4A4A4;
`
const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 2px solid #E5E5E5;
  justify-content: space-between;
`
const Image = styled.img`
  display: block;
  margin: 0px auto;
`

export default SignUp;
