import React, {useState, useEffect} from 'react'
import {Typography, Button, Modal, Input} from "@douyinfe/semi-ui";
import {IconPlusCircle} from '@douyinfe/semi-icons';
import axios from "axios";

function CourseOverview(){
    const { Title } = Typography;
    const [courses, setCourses] = useState([]);
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseClass, setCourseClass] = useState('');
    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        console.log('Ok button clicked');
        const newCourse = {
            course_id: courseCode,
            course_class: courseClass,
            course_name: courseName
        };
        axios.post('http://localhost:4000/Courses', newCourse)
            .then(response => {
                console.log('Course added successfully');
                setVisible(false);
            })
            .catch(error => console.log(error));
    };
    const handleCancel = () => {
        setVisible(false);
        console.log('Cancel button clicked');
    };
    const handleAfterClose = () => {
        console.log('After Close callback executed');
    };
    useEffect(() => {
        axios.get('http://localhost:4000/Courses')
            .then(response => setCourses(response.data))
            .catch(error => console.log(error));
    }, [handleOk]);
    return(
        <>
            <Title style={{ margin: '8px 0' }} >主页</Title>
            <Button theme='solid' icon={<IconPlusCircle/>} aria-label="添加课程" onClick={showDialog}>添加课程</Button>
            <Modal
                title="添加课程"
                visible={visible}
                onOk={handleOk}
                afterClose={handleAfterClose} //>=1.16.0
                onCancel={handleCancel}
                closeOnEsc={true}
            >
                <p>输入课程编码</p>
                <Input placeholder='例如：EXAM0000' onChange={
                    code => setCourseCode(code)
                }></Input>
                <p>输入课程班级号</p>
                <Input placeholder='例如：A' onChange={
                    division => setCourseClass(division)
                }></Input>
                <p>输入课程名称</p>
                <Input placeholder='例如：AP物理' onChange={
                    name => setCourseName(name)
                }></Input>
            </Modal>
            {courses.map(course => (
                <Button key={course.id}>{course.course_name}</Button>
            ))}
        </>
    )
}

export default CourseOverview;