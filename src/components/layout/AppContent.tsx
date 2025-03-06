import React from "react";
import {Layout} from "antd";

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};

const AppContent : React.FC = () => {
    return <Layout.Content style={contentStyle}>Content</Layout.Content>
}

export default AppContent