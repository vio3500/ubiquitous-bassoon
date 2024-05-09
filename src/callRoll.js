import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {Button, Descriptions, List, Modal, Spin} from "@douyinfe/semi-ui";
import axios from "axios";

function CallRoll() {
    const [selectedStudents, setSelectedStudents] = useState([]);
    useEffect(() => {
        if (students && selectedStudents.length === students.length) {
            setSelectedStudents([])
        }
    }, [selectedStudents])
    const [visible, setVisible] = useState(false);
    const {data: students} = useSWR('http://localhost:4000/students', url => axios.get(url).then(res => res.data))
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
    }
    const style = {
        border: '1px solid var(--semi-color-border)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '3px',
        paddingLeft: '20px',
        margin: '8px 2px',
    };
    const callRoll = () => {

    }
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
                title="基本对话框"
                visible={visible}
                onOk={handleOk}
                closeOnEsc={true}
            >
                <h1>Warning</h1>
            </Modal>
        </>
    )
}

export default CallRoll;
