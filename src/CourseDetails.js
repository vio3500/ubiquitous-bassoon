import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useSWR from "swr";
import axios from "axios";
import {Button, Divider, List, Modal, Radio, RadioGroup, SideSheet} from "@douyinfe/semi-ui";

const AttendanceRadio = ({onChange}) => {
    const [value, setValue] = useState(1);
    return (
        <RadioGroup onChange={ (e) => {
            setValue(e.target.value);
            console.log(e.target.value);
            onChange(e.target.value);
        }} value={value} aria-label="考勤" name="attendance">
            <Radio value={1}>正常</Radio>
            <Radio value={2}>迟到</Radio>
            <Radio value={3}>缺勤</Radio>
            <Radio value={4}>早退</Radio>
        </RadioGroup>
    )
}

function CourseDetails() {
    const {course_id} = useParams();
    const {
        data: students,
        mutate
    } = useSWR('http://localhost:4000/students', url => axios.get(url).then(res => res.data))
    const navigate = useNavigate();
    const handleCallFunction = () => {
        navigate(`/courses/${course_id}/operations`)
    }
    const [abnormalAttendance, setAbnormalAttendance] = useState([]);
    const RecordUnusualAttendance = (student_name, attendance_status, comments) => {
        if (attendance_status !== 1) {
            const unusualAttendance = {
                "attendance_status": attendance_status,
                "comments": comments,
                "student_name": student_name
            }
            const existingRecordIndex = abnormalAttendance.findIndex(record => record.student_name === student_name);
            if (existingRecordIndex !== -1) {
                abnormalAttendance[existingRecordIndex].attendance_status = attendance_status;
                abnormalAttendance[existingRecordIndex].comments = comments;
            } else {
                abnormalAttendance.push(unusualAttendance);
            }
            console.log(abnormalAttendance)
        }
    }

    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };
    const style = {
        border: '1px solid var(--semi-color-border)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '3px',
        paddingLeft: '20px',
        margin: '8px 2px',
    };
    const showModal = () => {
        setModalVisible(true);
    }
    const handleOk = () => {
        console.log('Ok button clicked');
        const newAttendance = {
            status: abnormalAttendance.attendance_status,
            student_name: abnormalAttendance.student_name,
            comments: ''
        };
        axios.post('http://localhost:4000/attendance', abnormalAttendance)
            .then(response => {
                console.log('OK');
                setModalVisible(false);
            })
            .catch(error => console.log(error));
    };
    const handleCancel = () => {
        setModalVisible(false);
        console.log('Cancel button clicked');
    };
    const handleAfterClose = () => {
        console.log('After Close callback executed');
    };
    return (
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
                        </div>
                    </List.Item>
                )}
            />
            <Button size='large' theme='solid' style={{marginRight: 8}} onClick={handleCallFunction}>上课</Button>
            <Button size='large' theme='solid' style={{marginRight: 8}} onClick={change}>考勤</Button>
            <SideSheet title="考勤" visible={visible} onCancel={change}>
                <Button theme='light' type='primary' style={{marginRight: 8}} onClick={showModal}>记录考勤</Button>
                <Modal
                    title="记录考勤"
                    visible={modalVisible}
                    onOk={handleOk}
                    afterClose={handleAfterClose} //>=1.16.0
                    onCancel={handleCancel}
                    closeOnEsc={true}
                >
                    <List
                        bordered
                        dataSource={students}
                        renderItem={
                            item => <List.Item>
                                <h3>{item.name}</h3>
                                <Divider margin='12px'/>
                                <AttendanceRadio onChange={status => (RecordUnusualAttendance(item.name, status, ''))}/>
                            </List.Item>
                        }
                    />
                </Modal>
            </SideSheet>
            <Button size='large' theme='solid' style={{marginRight: 8}}>统计</Button>
        </>
    )
}

export default CourseDetails;