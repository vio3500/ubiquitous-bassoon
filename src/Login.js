import React, {useEffect, useState} from 'react';
import {Button, Input, Typography} from '@douyinfe/semi-ui';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function Login() {
    const {Title} = Typography;
    const {Text} = Typography;
    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    //eslint-disable-next-line
    const [loginResponse, setLoginResponse] = useState(undefined)
    const [loginDeny, setLoginDeny] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const Error = () => {
        return <Text type="warning">{errorMessage}</Text>
    }
    useEffect((() => {
        if (username !== undefined && username !== '') {
            if (password !== undefined && password !== '') {
                setLoginDeny(false)
            } else {
                setLoginDeny(true)
            }
        } else {
            setLoginDeny(true)
        }
    }), [username, password])
    const handleLogin = () => {
        const loginData = {
            username: username,
            password: password
        }
        axios.post("http://localhost:5000/teachers/login", loginData, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data.token) {
                setLoginResponse("Success");
                console.log(response.data.token)
                setErrorMessage("")
                navigate("/Courses")
            } else {
                setLoginResponse("Failure");
                setErrorMessage("账户或密码错误。")
            }
        }).catch(error => {
            setLoginResponse(error.message);
            setErrorMessage("登录时遇到错误。请稍后再试。");
        });
    }
        return (
            <>
                    <Title>登录</Title>
                    <Input onChange=
                               {
                                   username => {
                                       setUsername(username)
                                   }
                               }
                           placeholder='账号'></Input>
                    <Input mode="password" placeholder='密码' onChange=
                        {
                            password => {
                                setPassword(password)
                            }
                        }
                    ></Input>
                    <Button disabled={loginDeny} size='large' theme='solid' type='secondary'
                            onClick={handleLogin}>登录</Button>
                    <Text type='danger'>{errorMessage}</Text>
                    <Text>没有账号？<Text link={{href: 'http://localhost:3000/register'}}>注册</Text></Text>
            </>
        )
    }

    export default Login