import React from "react";
import Group from "./Group";
import Call from "./Call";
import axios from "axios";
import {Spin, TabPane, Tabs} from "@douyinfe/semi-ui";
import useSWR from "swr";
import {useParams} from "react-router-dom";

function Operations() {
    const { course_id } = useParams();
    const token = localStorage.getItem('token'); // Fetch Bearer token from local storage

    const fetcher = url => axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.data);
    const {loading, error} = useSWR(`http://localhost:5000/courses/${course_id}/students`, url => axios.get(url).then(res => res.data))
    if (loading) {
        console.log(loading)
        return <Spin></Spin>
    }
    if (error) {
        console.log(error)
        return <div>Error: {error.message}</div>;
    }
    else {
    return (
        <div>
            <Tabs type="button">
                <TabPane tab="点名" itemKey="1">
                    <Call />
                </TabPane>
                <TabPane tab="分组" itemKey="2">
                    <Group />
                </TabPane>
            </Tabs>
        </div>
    )
    }
}

export default Operations;