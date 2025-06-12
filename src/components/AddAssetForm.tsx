import {useRef, useState} from "react";
import {
    Button,
    DatePicker,
    Divider,
    Form,
    FormProps,
    InputNumber, Result,
    Select,
    Space
} from "antd";
import {useCrypto} from "../context/crypto-context.tsx";
import CoinInfo from "./CoinInfo.tsx";
import {cryptoAssets} from "../data.ts";

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
    amount?: number;
    price?: number;
    date?: Date;
    total?: number;
};

interface CryptoAsset {
    id: string;
    amount: number;
    price: number;
    date: Date;
    grow?: boolean,
    growPercent?: number,
    totalAmount?: number,
    totalProfit?: number,
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} in not valid number!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
};

const AddAssetForm = ({onClose}) => {
    const [form] = Form.useForm()
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState<CryptoItem | null>(null)
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>
                ]}
            />
        )
    }

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

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date()
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset as CryptoAsset)

        const saved = JSON.parse(localStorage.getItem('cryptoAssets') || '[]')
        localStorage.setItem('cryptoAssets', JSON.stringify([...saved, newAsset]))
    };

    const handleAmountChange = (value) => {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value*price).toFixed(2 )
        })
    }

    const handlePriceChange = (value) => {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount*value).toFixed(2 )
        })
    }

    return <Form
        form={form}
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
        <CoinInfo coin={coin} withSymbol={false}/>
        <Divider/>
        <Form.Item<FieldType>
            label="Amount"
            name="amount"
            rules={[{required: true, type: 'number', min: 0}]}
        >
            <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{width: '100%'}}/>
        </Form.Item>

        <Form.Item<FieldType>
            label="Price"
            name="price"
        >
            <InputNumber onChange={handlePriceChange} style={{width: '100%'}}/>
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