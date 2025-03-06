import React from "react";
import {Card, Layout, Statistic} from "antd";
import { ArrowUpOutlined } from '@ant-design/icons';

const siderStyle: React.CSSProperties = {
    padding: '1rem'
};

const AppSider: React.FC = () => {
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Card>
                <Statistic title="Active"
                           value={11.28}
                           precision={2}
                           valueStyle={{color: '#3f8600'}}
                           prefix={<ArrowUpOutlined/>}
                           suffix="%"/>
            </Card>
        </Layout.Sider>
    )
}

export default AppSider