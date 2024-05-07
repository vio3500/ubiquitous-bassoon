import './callBoard.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import useSWR from "swr";
import {Button, Descriptions, InputNumber, List, Modal, Space, Spin, TabPane, Tabs} from "@douyinfe/semi-ui";

function CallBoard() {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [groupSize, setGroupSize] = useState(2);
    const [groups, setGroups] = useState([]);
    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
    }
    useEffect(() => {
        if (students && selectedStudents.length === students.length) {
            setSelectedStudents([])
        }
    }, [selectedStudents])
    const fetcher = url => axios.get(url).then(res => res.data)
    const {data: students, error, loading} = useSWR('http://localhost:4000/students', fetcher)
    if (loading) {
        return <Spin></Spin>
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const style = {
        border: '1px solid var(--semi-color-border)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '3px',
        paddingLeft: '20px',
        margin: '8px 2px',
    };
    const getShuffledArr = arr => {
        const newArr = arr.slice();
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    };
    const callRoll = () => {

    }
    const group = () => {
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
        <div>
            <Tabs type="button">
                <TabPane tab="点名" itemKey="1">
                    <List
                        grid={{
                            gutter: 12,
                            xs: 0,
                            sm: 0,
                            md: 12,
                            lg: 8,
                            xl: 8,
                            xxl: 6,
                        }}
                        dataSource={students}
                        renderItem={item => (
                            <List.Item style={style}>
                                <div>
                                    <h1 style={{color: 'var(--semi-color-text-0)', fontWeight: 1000}}>{item.name}</h1>
                                    <Descriptions
                                        align="center"
                                        size="small"
                                        row
                                        data={[
                                            {key: '分数', value: item.points},
                                            {key: '总分', value: item.total_points}
                                        ]}
                                    />
                                    <div style={{margin: '12px 0', display: 'flex', justifyContent: 'flex-end'}}>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                    <Button size='large' theme='solid' style={{marginRight: 8}} onClick={showDialog}>随机抽取</Button>
                    <Modal
                        title="基本对话框"
                        visible={visible}
                        onOk={handleOk}
                        closeOnEsc={true}
                    >
                        <h1>Warning</h1>
                    </Modal>
                </TabPane>
                <TabPane tab="分组" itemKey="2">
                    <InputNumber innerButtons min={2} max={10} defaultValue={2} onChange={x => setGroupSize(x)}/>
                    <Button theme='solid' size='large' onClick={() => group()}>分组</Button>
                    <Space>
                        {groups.map(group => (
                            <Space vertical>
                                {group.map(student => (
                                    <div>{student.name}</div>
                                ))}
                            </Space>
                        ))}
                    </Space>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default CallBoard;