import React, {useEffect, useState} from "react";
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
    const [select, setSelect] = useState(false)
    const {crypto} = useCrypto()

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelect(prev => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    const handleSelect = (value: string) => {
        console.log(value)
    }

    return <Layout.Header style={headerStyle}>
        <Select
            style={{width: 250}}
            open={select}
            onSelect={handleSelect}
            onClick={() => setSelect((prev) => !prev)}
            value="press / to open"
            options={crypto.map(coin => ({
                label: coin.name,
                value: coin.id,
                icon: coin.icon
            }))}
            optionRender={(option) => (
                <Space>
                    <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                </Space>
            )}
        />
        <Button type="primary">Add Asset</Button>
    </Layout.Header>
}

export default AppHeader