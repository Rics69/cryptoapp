import React from "react";
import {Card, Layout, List, Statistic, Typography} from "antd";
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';

const siderStyle: React.CSSProperties = {
    padding: '1rem'
};

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const AppSider: React.FC = () => {
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Card style={{marginBottom: '1rem'}}>
                <Statistic title="Active"
                           value={11.28}
                           precision={2}
                           valueStyle={{color: '#3f8600'}}
                           prefix={<ArrowUpOutlined/>}
                           suffix="%"/>
                <List
                    size='small'
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                    )}
                />
            </Card>
            <Card>
                <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{color: '#cf1322'}}
                    prefix={<ArrowDownOutlined/>}
                    suffix="%"
                />
            </Card>
        </Layout.Sider>
    )
}

export default AppSider