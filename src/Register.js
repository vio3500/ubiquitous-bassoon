import React, {useEffect, useState} from 'react';
import {Button, Input, Typography} from '@douyinfe/semi-ui';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {Title} from "@douyinfe/semi-ui/lib/es/skeleton/item";

function Register() {
    const {Title} = Typography;
    const {Text} = Typography;
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState(undefined);
    const [newPassword, setNewPassword] = useState(undefined);
    const handleRegister = () => {
        const registerData = {
            username: newUsername,
            password: newPassword
        }
        axios.post("http://localhost:5000/teachers/register", registerData, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data && response.data.code === 0) {
                console.log("Registration successful:", response.data);
            } else {
                console.log("Unexpected response:", response.data);
            }
        }).catch(error => {
            console.error("There was an error with the registration:", error);
        });
        }
    return(
        <>
            <Title>注册</Title>
            <Input onChange={
                new_username => {
                    setNewUsername(new_username)
                }
            }
                   placeholder='新用户名'></Input>
            <Input mode="password" placeholder='密码' onChange={
                new_password => {
                    setNewPassword(new_password)
                }
            }
            ></Input>
            <Button size='large' theme='solid' type='secondary' onClick={handleRegister}>注册</Button>
        </>
    )
    }
    export default Register;