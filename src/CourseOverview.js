import React from 'react'
import {Typography, Button} from "@douyinfe/semi-ui";
import {IconPlusCircle} from '@douyinfe/semi-icons';

// 我的屌没了

function CourseOverview(){
    const { Title } = Typography;
    return(
        <>
            <Title style={{ margin: '8px 0' }} >主页</Title>
            <Button icon={<IconPlusCircle/>} aria-label="添加课程"/>
            <Button>测试</Button>
            <Button>英语语言文学</Button>
        </>
    )
}

export default CourseOverview;