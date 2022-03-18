import React, { useState } from "react";
import { Button, Container, PageTemplate, TextBox, TextButton } from "../../component";
import { ColorType } from "../../enums/ColorType";
import frontApiClient from "../../libs/FrontApiClient";
import { useNavigate } from "react-router-dom"

const SignIn = () => {
  const [ email, setEmail ] = useState<String>('')
  const [ password, setPassword ] = useState<String>('')
  const navigate = useNavigate()

  const handleClickSignIn = () => {
    signIn()
  }

  const signIn = async () => {
    try {
      const request = await frontApiClient.post('/member/sign-in', {
        email: email,
        password: password
      })
      const authorization = request.headers.authorization
      const refreshToken = request.headers['x-refresh-token']
      localStorage.setItem("token", authorization)
      localStorage.setItem("refreshToken", refreshToken)
      navigate('/')
    } catch (e) {
      alert('로그인에 실패했습니다.')
    }
  }

  return (
    <PageTemplate>
      <Container width={"40%"} height={"500px"} classNames={["signIn"]}>
        <div className={"brandImage"}>
          <img src={"logo.png"} alt={"UniEat 로고"} />
        </div>
        <TextBox label={"관리자 계정"} onChange={e => setEmail(e.target.value)} />
        <TextBox label={"비밀번호"} onChange={e => setPassword(e.target.value)} isPassword={true} />
        <div className={"buttonRow"}>
          <Button text={"로그인"} width={"60%"} color={ColorType.PRIMARY} onClick={handleClickSignIn} />
        </div>
        <div className={"buttonRow"}>
          <TextButton text={"비밀번호 초기화"} width={"60%"} color={ColorType.PRIMARY} onClick={() => {}} />
        </div>
      </Container>
    </PageTemplate>
  )
}

export default SignIn
