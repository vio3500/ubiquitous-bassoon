import React, {useEffect, useState} from 'react'
import {Button, Card, Input, Modal, Popover, Typography, Dropdown} from "@douyinfe/semi-ui";
import {IconMore, IconPlusCircle} from '@douyinfe/semi-icons';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function CourseOverview() {
    const {Title} = Typography;
    const {Meta} = Card;
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseToDeleteId, setCourseToDeleteId] = useState('');
    const [courseAddDialogVisible, setCourseAddDialogVisible] = useState(false);
    const [courseDeleteDialogVisible, setCourseDeleteDialogVisible] = useState(false);
    const navigate = useNavigate();
    const showCourseAddDialog = () => {
        setCourseAddDialogVisible(true);
    };
    const handleCourseAddOk = () => {
        console.log('Ok button clicked');
        const newCourse = {
            course_id: courseId,
            name: name
        };
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        axios.post('http://localhost:5000/courses', newCourse, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.data.code === 0) {
                    console.log('Course added successfully');
                    setCourseAddDialogVisible(false);
                    fetchCourses(); // Fetch courses again to update the list
                } else {
                    console.log('Failed to add course');
                }
            })
            .catch(error => console.log(error));
    };
    const handleCourseAddCancel = () => {
        setCourseAddDialogVisible(false);
    };
    const showCourseDeleteDialog = (e, courseId) => {
        e.stopPropagation();
        console.log('User about to delete a course');
        setCourseToDeleteId(courseId);
        setCourseDeleteDialogVisible(true);
    };
    const handleCourseDeleteOk = () => {
        console.log('Ok button clicked');
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        axios.delete(`http://localhost:5000/courses/${courseToDeleteId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.code === 0) {
                    console.log('Course deleted successfully');
                    setCourseDeleteDialogVisible(false);
                    fetchCourses(); // Fetch courses again to update the list
                } else {
                    console.log('Failed to delete course');
                }
            })
            .catch(error => console.log(error));
    };
    const handleCourseDeleteCancel = () => {
        setCourseDeleteDialogVisible(false);
    }
    const fetchCourses = () => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        axios.get('http://localhost:5000/courses', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => setCourses(response.data))
            .catch(error => console.log(error));
    };
    useEffect(() => {
        fetchCourses();
    }, []);
    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    }
    const handlePopoverClick = (e) => {
        e.stopPropagation();
    };
    return (
        <>
            <Title style={{margin: '8px 0'}}>主页</Title>
            <Button theme='solid' icon={<IconPlusCircle/>} aria-label="添加课程"
                    onClick={showCourseAddDialog}>添加课程</Button>
            <Modal
                title="添加课程"
                visible={courseAddDialogVisible}
                onOk={handleCourseAddOk}
                onCancel={handleCourseAddCancel}
                closeOnEsc={true}
            >
                <p>输入课程编码</p>
                <Input placeholder='例如：EXAM0000' onChange={
                    code => setCourseId(code)
                }></Input>
                <p>输入课程名称</p>
                <Input placeholder='例如：AP物理' onChange={
                    name => setName(name)
                }></Input>
            </Modal>
            <Modal
                title="删除课程"
                visible={courseDeleteDialogVisible}
                maskClosable={false}
                onOk={handleCourseDeleteOk}
                onCancel={handleCourseDeleteCancel}
            >
                <p>是否要删除该课程？此操作不可逆。</p>
            </Modal>
            {courses.map(course => (
                <Card
                    key={course.id}
                    shadows='hover'
                    style={{ maxWidth: 360, margin: '16px 0' }}
                    bodyStyle={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                    onClick={() => handleCourseClick(course.id)}
                >
                    <Meta title={course.name} />
                    <Dropdown
                        trigger={'click'}
                        position={'bottomLeft'}
                        render={
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => showCourseDeleteDialog(e, course.id)}>删除课程</Dropdown.Item>
                            </Dropdown.Menu>
                        }
                    >
                        <Button theme='borderless' icon={<IconMore />} onClick={handlePopoverClick} />
                    </Dropdown>
                </Card>
            ))}
        </>
    )
}

export default CourseOverview;