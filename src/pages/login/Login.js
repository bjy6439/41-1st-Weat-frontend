import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss';
import '../../styles/common.scss';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = event => {
    setLoginData(preValue => {
      const { name, value } = event.target;
      return { ...preValue, [name]: value };
    });
  };

  const handleClick = () => {
    fetch('http://10.58.52.250:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          goToMain();
        } else {
          setMessage('이메일, 비밀번호를 확인하세요');
        }
      });
  };
  //token 이름 확인하기 (backend)
  const enterLogin = e => {
    if (e.key === 'enter') {
      handleClick();
    }
  };

  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate('/SignUp');
  };
  const goToMain = () => {
    navigate('/Main');
  };

  return (
    <div className="login">
      <h1 className="title">로그인</h1>
      <label className="inputLabel">이메일 로그인</label>
      <div className="input">
        <input
          name="email"
          value={loginData.email}
          className="inputData"
          type="text"
          placeholder="아이디(이메일 주소)를 입력하세요"
          onChange={handleChange}
        />
        <input
          name="password"
          value={loginData.password}
          className="inputData"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={handleChange}
          onKeyDown={enterLogin}
        />
        <div className="errorMessage">{message}</div>
        <button onClick={handleClick} className="button" type="button">
          로그인
        </button>

        <span className="firstVisit">정육각은 처음이신가요?</span>
        <div onClick={goToSignUp} className="goToSignUp">
          회원가입하기
        </div>
      </div>
    </div>
  );
};

export default Login;
