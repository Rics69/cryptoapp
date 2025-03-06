import React from "react";
import {Card, Layout} from "antd";

const siderStyle: React.CSSProperties = {
    padding: '1rem'
};

const AppSider: React.FC = () => {
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Card>

            </Card>
        </Layout.Sider>
    )
}

export default AppSider