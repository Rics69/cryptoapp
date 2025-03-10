import React from "react";
import {Button, Layout, Select, Space} from "antd";
import {useCrypto} from "../../context/crypto-context.tsx";

const headerStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const AppHeader: React.FC = () => {
    const { crypto  } = useCrypto()

    const handleSelect = (value: string) => {
        console.log(value)
    }

    return <Layout.Header style={headerStyle}>
        <Select
            style={{ width: 250 }}
            onSelect={handleSelect}
            value="press / to open"
            optionLabelProp="label"
            options={crypto.map(coin => ({
                label: coin.name,
                value: coin.id,
                icon: coin.icon
            }))}
            optionRender={(option) => (
                <Space>
                    <img style={{width: 20}} src={option.data.icon} alt={option.data.label} /> {option.data.label}
                </Space>
            )}
        />
        <Button type="primary">Add Asset</Button>
    </Layout.Header>
}

export default AppHeader