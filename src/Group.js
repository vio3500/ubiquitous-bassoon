import React, {useState} from "react";
import {Button, InputNumber, Space, Spin} from "@douyinfe/semi-ui";
import useSWR from "swr";
import axios from "axios";
import {useParams} from "react-router-dom";

const getShuffledArr = arr => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
};

function Group() {
    const token = localStorage.getItem('token'); // Fetch Bearer token from local storage
    const fetcher = url => axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.data);
    const { course_id } = useParams();
    const {data: students} = useSWR(`http://localhost:5000/courses/${course_id}/students`, fetcher);
    const [groupSize, setGroupSize] = useState(2);
    const [groups, setGroups] = useState([]);
    const grouping = () => {
        const students_t = getShuffledArr(students);
        const totalPeople = students_t.length;
        let groupCount = Math.floor(totalPeople / groupSize);
        let remainder = totalPeople % groupSize;

        if (remainder === 1) {
            remainder++;
            groupCount--;
        }

        const groups = [];

        let startIndex = 0;
        for (let i = 0; i < groupCount; i++) {
            const group = students_t.slice(startIndex, startIndex + groupSize);
            groups.push(group);
            startIndex += groupSize;
        }

        if (remainder > 0) {
            const lastGroup = students_t.slice(startIndex);
            groups.push(lastGroup);
        }
        setGroups(groups);
    };
    return (
        <>
            <InputNumber innerButtons min={2} max={10} defaultValue={2} onChange={x => setGroupSize(x)}/>
            <Button theme='solid' size='large' onClick={() => grouping()}>分组</Button>
            <Space>
                {groups.map(group => (
                    <Space vertical>
                        {group.map(student => (
                            <div>{student.name}</div>
                        ))}
                    </Space>
                ))}
            </Space>
        </>
    )
}

export default Group