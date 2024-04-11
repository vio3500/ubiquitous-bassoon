import './login.css';
import React, { useState } from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { Input } from '@douyinfe/semi-ui';
import { Button } from '@douyinfe/semi-ui';

function Login() {
    const { Title } = Typography;
    const { Text } = Typography;
    const [accountID, setAccountID] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [loginResponse, setLoginResponse] = useState(undefined)
    const handleLogin = () => {
        const generateRandomNumber = () => {
            return Math.random();
        }
        const login = new Promise((resolve, reject) => {
            if (generateRandomNumber() < 0.5) {
                resolve("Login OK")
            } else {
                reject("Error: Access Denied. ErrorCode=0000")
            }
        })
        login
            .then((response) => {
                setLoginResponse(response);
                console.log(response)
            })
            .catch((error) => {
                setLoginResponse(error);
                console.log(error)
            });
    }
    return (
        <>
            <Title>登录</Title>
            <Input onChange=
                {
                    AccountID=>
                    {
                        setAccountID(AccountID);
                        console.log(AccountID);
                    }
                }
                   placeholder='账号'></Input>
            <Input mode="password" placeholder='密码' onChange=
                {
                    Password=>
                    {
                        setPassword(password);
                        console.log(Password);
                    }
                }
            ></Input>
            <Button size='large' theme='solid' type='secondary' onClick={handleLogin}>登录</Button>
            <Text>没有账号？<Text link={{ href: '' }}>注册</Text></Text>
        </>
    )
}

export default Login