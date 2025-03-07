import React, {useEffect, useState} from "react";
import {Card, Layout, List, Statistic, Typography, Spin} from "antd";
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {fakeFetchCrypto, fetchAssets} from '../../api'

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

interface CryptoData {
    result: CryptoItem[];
}

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

interface CryptoAsset {
    id: string;
    amount: number;
    price: number;
    date: Date;
}

const AppSider: React.FC = () => {

    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState<CryptoItem[]>([])
    const [assets, setAssets] = useState<CryptoAsset[]>([])

    useEffect(() => {
        async function preload() {
            setLoading(true)

            const {result} = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setCrypto(result)
            setAssets(assets)

            setLoading(false)
        }
        preload()
    }, [])

    if (loading) {
        return <Spin fullscreen />
    }

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