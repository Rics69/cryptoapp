import React, {useState} from "react";
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Flex,
    Form,
    FormProps,
    Input,
    InputNumber,
    Select,
    Space,
    Typography
} from "antd";
import {useCrypto} from "../context/crypto-context.tsx";

interface CryptoItem {
    id: string;
    icon: string;
    name: string;
    symbol: string;
    rank: number;
    price: number;
    priceBtc: number;
    volume: number;
    marketCap: number;
    availableSupply: number;
    totalSupply: number;
    fullyDilutedValuation: number;
    priceChange1h: number;
    priceChange1d: number;
    priceChange1w: number;
    redditUrl?: string;
    websiteUrl?: string;
    twitterUrl?: string;
    contractAddress?: string;
    decimals?: number;
    explorers: string[];
}

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} in not valid number!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
};

const AddAssetForm = () => {
    const {crypto} = useCrypto()
    const [coin, setCoin] = useState<CryptoItem | null>(null)

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

    return <Form
        name="basic"
        labelCol={{span: 4}}
        wrapperCol={{span: 10}}
        style={{maxWidth: 600}}
        initialValues={{
            price: +coin.price.toFixed(2)
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
    >
        <Flex align="center">
            <img src={coin?.icon} alt={coin?.name} style={{width: 40, marginRight: 10}}/>
            <Typography.Title level={2} style={{margin: 0}}>{coin?.name}</Typography.Title>
        </Flex>
        <Divider/>
        <Form.Item<FieldType>
            label="Amount"
            name="amount"
            rules={[{required: true, type: 'number', min: 0}]}
        >
            <InputNumber style={{width: '100%'}}/>
        </Form.Item>

        <Form.Item<FieldType>
            label="Price"
            name="price"
        >
            <InputNumber disabled style={{width: '100%'}}/>
        </Form.Item>

        <Form.Item<FieldType>
            label="Date & Time"
            name="date"
        >
            <DatePicker showTime/>
        </Form.Item>

        <Form.Item<FieldType>
            label="Total"
            name="total"
        >
            <InputNumber disabled style={{width: '100%'}}/>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                Add Asset
            </Button>
        </Form.Item>
    </Form>
}

export default AddAssetForm