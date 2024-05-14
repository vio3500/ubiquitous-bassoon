import React from "react";
import Group from "./Group";
import Call from "./Call";
import axios from "axios";
import {Spin, TabPane, Tabs} from "@douyinfe/semi-ui";
import useSWR from "swr";

function Operations() {
    const {loading, error} = useSWR('http://localhost:4000/students', url => axios.get(url).then(res => res.data))
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