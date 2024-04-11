import React, { useState } from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { Input } from '@douyinfe/semi-ui';
import { Button } from '@douyinfe/semi-ui';

function Login() {
    const { Title } = Typography;
    const { Text } = Typography;
    const [loginResponse, setLoginResponse] = useState(undefined)
    const [value, setValue] = useState(undefined)
    return (
        <>
            <Title>登录</Title>
            <Input onChange={ChangeValue=>{
                setValue(ChangeValue);
                console.log(ChangeValue);}
            } placeholder='账号'></Input>
            <Input mode="password" placeholder='密码'></Input>
            <Button size='large' onClick={() => {
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
            }}>登录</Button>
            <Text>没有账号？<Text link={{ href: 'https://baidu.com/' }}>注册</Text></Text>
        </>
    )
}

export default Login