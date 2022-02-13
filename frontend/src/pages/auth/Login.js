import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AuthInput from '../../components/molecules/AuthInput';
import Logo from '../../assets/nav_logo.png';
import Button from '../../components/atoms/Button';

import LoginAPI from '../../api/auth/Login';
// import { login } from '../../store/auth/actions';

const Login = () => {
  const history = useHistory();
//   const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
//   const [isLoginPending, setIsLoginPending] = useState(false);

  const onChangeId = (e) => setId(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onKeyDownPassword = (e) => (e.key === 'Enter') && onSubmit();

  const onSubmit = async () => {
    const result = await LoginAPI(id, password);
    console.log(result);
    if (result.success === true) {
      sessionStorage.setItem('jwt', result.token);
      alert ("로그인 성공")
      document.location.href = "/";
    }
    else
      alert ("로그인 실패")
  };

  return (
    <>
      <LogoBox>
        <Link to="/">
          <Image src={Logo} alt="Logo"/>
        </Link>
      </LogoBox>
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
        style={{ marginBottom: 55 }}
      />
      <Button text="로그인" width={"360px"} onClick={onSubmit}></Button>
      <SignUpBox>
          <Text>아직 가입 안하셨나요?</Text>
          <Link to="/auth/signup">
              <MoveLink>가입하기</MoveLink>
          </Link>
      </SignUpBox>
    </>
  );
};

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
const MoveLink = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  color: #5A5A5A;
  border-bottom: 1px solid #5A5A5A;
  margin-left: 3px;
  cursor: pointer;
`
export default Login;
