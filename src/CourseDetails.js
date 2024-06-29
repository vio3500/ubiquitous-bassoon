import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from "swr";
import axios from "axios";
import { Button, Divider, Dropdown, Input, List, Modal, Radio, RadioGroup, SideSheet } from "@douyinfe/semi-ui";
import { IconMore, IconPlusCircle } from "@douyinfe/semi-icons";

const AttendanceRadio = ({ studentId, onChange }) => {
    const [value, setValue] = useState(0);

    return (
        <RadioGroup onChange={(e) => {
            setValue(e.target.value);
            console.log(e.target.value);
            onChange(studentId, e.target.value);
        }} value={value} aria-label="考勤" name="attendance">
            <Radio value={0}>正常</Radio>
            <Radio value={1}>迟到</Radio>
            <Radio value={2}>缺勤</Radio>
            <Radio value={3}>早退</Radio>
        </RadioGroup>
    )
}

function CourseDetails() {
    const { course_id } = useParams();
    const token = localStorage.getItem('token'); // Fetch Bearer token from local storage

    const fetcher = url => axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.data);

    const { data: students, mutate } = useSWR(`http://localhost:5000/courses/${course_id}/students`, fetcher);
    const navigate = useNavigate();
    const handleCallFunction = () => {
        navigate(`/courses/${course_id}/operations`)
    }
    const [abnormalAttendance, setAbnormalAttendance] = useState([]);
    const RecordUnusualAttendance = (course_id, student_id, class_id, attendance_status) => {
        if (attendance_status !== 0) {
            const unusualAttendance = {
                course_id: course_id,
                student_id: student_id,
                class_id: class_id,
                status: attendance_status
            };
            setAbnormalAttendance([...abnormalAttendance, unusualAttendance]);
            console.log(abnormalAttendance);
        }
    }
    const [newStudentName, setNewStudentName] = useState("");
    const [attendanceTabVisible, setAttendanceTabVisible] = useState(false);
    const [addStudentTabVisible, setAddStudentTabVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [studentToDeleteId, setStudentToDeleteId] = useState("");
    const [studentDeleteDialogVisible, setStudentDeleteDialogVisible] = useState(false);
    const changeAttendanceTabs = () => {
        setAttendanceTabVisible(!attendanceTabVisible);
    };
    const changeAddStudentTabs = () => {
        setAddStudentTabVisible(!addStudentTabVisible);
    }
    const handleAddStudent = () => {
        const newStudent = {
            name: newStudentName
        }
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        axios.post(`http://localhost:5000/courses/${course_id}/students`, newStudent, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.data.code === 0) {
                    console.log('Student added successfully');
                    setAddStudentTabVisible(false);
                    mutate(); // refresh the student list
                } else {
                    console.log('Failed to add a student.');
                }
            })
            .catch(error => console.log(error));
    }
    const showDeleteStudentTab = (e, studentId) => {
        e.stopPropagation();
        console.log('User about to delete a student');
        setStudentToDeleteId(studentId);
        setStudentDeleteDialogVisible(true);
    }
    const hideDeleteStudentTab = () => {
        setStudentDeleteDialogVisible(false);
    }
    const handleDeleteStudent = () => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        axios.delete(`http://localhost:5000/courses/${course_id}/students/${studentToDeleteId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.code === 0) {
                    console.log('Student deleted successfully');
                    setStudentDeleteDialogVisible(false);
                    mutate(); // refresh the student list
                } else {
                    console.log('Failed to delete student');
                }
            })
            .catch(error => console.log(error));
    }
    const handleAddClassSession = () => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const timestamp = Date.now(); // Current timestamp in milliseconds
        axios.post(`http://localhost:5000/courses/${course_id}/classes`, { timestamp }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.data.code === 0) {
                    const classId = response.data.class_id;
                    console.log('Class session added successfully, class ID:', classId);
                    // Store the class_id locally or perform additional actions
                    localStorage.setItem('class_id', classId); // Example of storing class_id in localStorage
                } else {
                    console.log('Failed to add class session.');
                }
            })
            .catch(error => console.log(error));
    };
    const style = {
        border: '1px solid var(--semi-color-border)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '3px',
        paddingLeft: '20px',
        margin: '8px 2px',
    };
    const showAttendanceTab = () => {
        setModalVisible(true);
    }
    const handleAttendanceSubmit = () => {

    }
    const handleAttendanceSubmitCancel = () => {
        setModalVisible(false);
        console.log('Cancel button clicked');
    };
    const handlePopoverClick = (e) => {
        e.stopPropagation();
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
                            <h1 style={{ color: 'var(--semi-color-text-0)', fontWeight: 1000 }}>{item.name}</h1>
                            <Dropdown
                                trigger={'click'}
                                position={'bottomLeft'}
                                render={
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={(e) => showDeleteStudentTab(e, item.id)}>删除课程</Dropdown.Item>
                                    </Dropdown.Menu>
                                }
                            >
                                <Button theme='borderless' icon={<IconMore />}></Button>
                            </Dropdown>
                            <Modal
                                title="删除学生"
                                visible={studentDeleteDialogVisible}
                                maskClosable={false}
                                onOk={handleDeleteStudent}
                                onCancel={hideDeleteStudentTab}
                            >
                                <p>是否要删除该学生？此操作不可逆。</p>
                            </Modal>
                        </div>
                    </List.Item>
                )}
            />
            <Button size='large' theme='solid' style={{ marginRight: 8 }} onClick={handleCallFunction}>上课</Button>
            <Button size='large' theme='solid' style={{ marginRight: 8 }} onClick={changeAttendanceTabs}>考勤</Button>
            <SideSheet title="考勤" visible={attendanceTabVisible} onCancel={changeAttendanceTabs}>
                <Button theme='light' type='primary' style={{ marginRight: 8 }} onClick={showAttendanceTab}>记录考勤</Button>
                <Modal
                    title="记录考勤"
                    visible={modalVisible}
                    onOk={handleAttendanceSubmit}
                    onCancel={handleAttendanceSubmitCancel}
                    closeOnEsc={true}
                >
                    <List
                        bordered
                        dataSource={students}
                        renderItem={
                            item => <List.Item>
                                <h3>{item.name}</h3>
                                <Divider margin='12px' />
                                <AttendanceRadio studentId={item.id} onChange={(studentId, status) => RecordUnusualAttendance(course_id, studentId, '', status)} />
                            </List.Item>
                        }
                    />
                </Modal>
            </SideSheet>
            <Button size='large' theme='solid' style={{ marginRight: 8 }}>统计</Button>
            <SideSheet title="添加学生" visible={addStudentTabVisible} onCancel={changeAddStudentTabs}>
                <p>输入学生姓名</p>
                <Input value={newStudentName} onChange={(e) => setNewStudentName(e)} />
                <Button theme='solid' onClick={handleAddStudent}>添加</Button>
            </SideSheet>
            <Button size='large' theme='borderless' icon={<IconPlusCircle />} onClick={changeAddStudentTabs}>添加学生</Button>
        </>
    )
}

export default CourseDetails;
