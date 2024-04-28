import './login.css';
import React, {useEffect, useState} from 'react';
import {Button, Input, Typography} from '@douyinfe/semi-ui';
import {useNavigate} from 'react-router-dom';

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
        const login = new Promise((resolve, reject) => {
            if (Math.random() <= 0.5) {
                resolve("Login OK")
            } else {
                reject("Error: Access Denied. ErrorCode=0000")
            }
        })
        login.then((response) => {
            setLoginResponse(response);
            setErrorMessage('')
            navigate("/CallBoard");
        })
            .catch((error) => {
                setLoginResponse(error);
                setErrorMessage('账户或密码错误，请重试！')
            });
    }
    return (
        <>
            <div id={'login'}>
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
                <Error errorInfo={errorMessage}/>
                <Text>没有账号？<Text link={{href: ''}}>注册</Text></Text>
            </div>
        </>
    )
}

export default Login