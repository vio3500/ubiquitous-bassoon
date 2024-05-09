import './callBoard.css';
import React from "react";
import Group from "./group";
import CallRoll from "./callRoll";
import axios from "axios";
import {Spin, TabPane, Tabs} from "@douyinfe/semi-ui";
import useSWR from "swr";

function CallBoard() {
    const {loading, error} = useSWR('http://localhost:4000/students', url => axios.get(url).then(res => res.data))
    if (loading) {
        return <Spin></Spin>
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <Tabs type="button">
                <TabPane tab="点名" itemKey="1">
                    <CallRoll />
                </TabPane>
                <TabPane tab="分组" itemKey="2">
                    <Group />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default CallBoard;