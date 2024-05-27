import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import useSWR from "swr";
import axios from "axios";
import {Button, SideSheet, List, Modal, Input} from "@douyinfe/semi-ui";
import {useNavigate} from 'react-router-dom';
import {IconPlusCircle} from "@douyinfe/semi-icons";

function CourseDetails() {
  const { course_id } = useParams();
  const {data: students, mutate} = useSWR('http://localhost:4000/students', url => axios.get(url).then(res => res.data))
  const navigate = useNavigate();
  const handleCallFunction = () => {
    navigate(`/courses/${course_id}/operations`)
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
            <Button theme='light' type='primary' style={{ marginRight: 8 }} onClick={showModal}>修改考勤</Button>
            <Modal
                title="修改考勤"
                visible={modalVisible}
                onOk={handleOk}
                afterClose={handleAfterClose} //>=1.16.0
                onCancel={handleCancel}
                closeOnEsc={true}
            >
            </Modal>
        </SideSheet>
        <Button size='large' theme='solid' style={{marginRight: 8}}>统计</Button>
      </>
  )
}

export default CourseDetails;