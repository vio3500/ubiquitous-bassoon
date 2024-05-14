import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {Button, Descriptions, List, Modal, Spin} from "@douyinfe/semi-ui";
import axios from "axios";
import {updateStudent} from './Requests'

function Call() {
    const [currentStudent, setCurrentStudent] = useState(false);
    const [visible, setVisible] = useState(false);
    const {data: students, mutate} = useSWR('http://localhost:4000/students', url => axios.get(url).then(res => res.data))
    useEffect(() => {
        if (students) {
            const unselectStudents = students.filter(student => dataItem => !dataItem.selected);
            if (unselectStudents.length === 0) {
                const updatePromises = students.map(student => updateStudent({
                    id: student.id,
                    data: {new: false}
                })
                )
                Promise.all(updatePromises).then(() => {
                    mutate();
                })
            }
        }
    }, [students])
    const showDialog = () => {
        const unselectStudents = students.filter(dataItem => ! dataItem.selected)
        let randomIndex = Math.floor(Math.random() * unselectStudents.length);
        let randomPerson = unselectStudents[randomIndex];
        setCurrentStudent(randomPerson)
        setVisible(true);
    };
    const handleOk = async () => {
        setVisible(false);
        await updateStudent({
            id: currentStudent.id,
            data: {points: currentStudent.points + 1, new: true},
        }).then(() => mutate());
        setCurrentStudent({})
    }

    const handleCancel = async () => {
        setVisible(false);
        await updateStudent({
            id: currentStudent.id,
            data: {new: false}
        }).then(() => mutate());
        setCurrentStudent({});
    }

    const style = {
        border: '1px solid var(--semi-color-border)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '3px',
        paddingLeft: '20px',
        margin: '8px 2px',
    };

    return(
        <>
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
                title="结果"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                closeOnEsc={true}
            >
                <h1>{currentStudent.name}</h1>
            </Modal>
        </>
    )
}

export default Call;
