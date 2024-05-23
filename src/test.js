import { useState, useEffect } from 'react';
import http from './http';

function Test() {
    const [data, setData] = useState('');

    useEffect(() => {
        http.post('/', {
            username: 'admin',
            password: '123456'
        })
            .then(res => localStorage.setItem('token', res.data.token));
    }, []);

    const test = () => {
        http.get('/').then(res => setData(res.data));
    }

    return (
        <>
            <button onClick={test}>test</button>
            <div>{data}</div>
        </>

    );
}

export default Test;