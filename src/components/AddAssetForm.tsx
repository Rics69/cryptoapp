import React, {useState} from "react";
import {Select, Space} from "antd";
import {useCrypto} from "../context/crypto-context.tsx";

const AddAssetForm = () => {
    const {crypto} = useCrypto()
    const [coin, setCoin] = useState(null)

    if (!coin) {
        return (
            <Select
                style={{width: '100%'}}
                onSelect={(v) => setCoin(crypto.find(el => el.id === v))}
                placeholder="Select coin"
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
        )
    }

    return <form>Form Asset</form>
}

export default AddAssetForm