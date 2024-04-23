import './callBoard.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function CallBoard() {
    const [students, setStudents] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/students')
            .then(response => {
                console.log(response.data);
                setStudents(response.data)// 输出获取到的学生信息
            })
            .catch(error => {
                console.error(error); // 输出错误信息
            });
    }, []);

    return (
        <>
            <div>{students && students.map(x => <div>{x.name}</div>)}</div>
        </>
    );
}

export default CallBoard;