import './callBoard.css';
import React, {useEffect, useState} from "react";
import Group from "./group";
import axios from "axios";
import useSWR from "swr";
import {Button, Descriptions, InputNumber, List, Modal, Space, Spin, TabPane, Tabs} from "@douyinfe/semi-ui";

function CallBoard() {
    const [selectedStudents, setSelectedStudents] = useState([]);
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
    const callRoll = () => {

    }
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
                    <Group />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default CallBoard;