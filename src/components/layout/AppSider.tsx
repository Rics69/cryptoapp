import {Card, Layout, List, Statistic, Typography, Tag} from "antd";
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {capitalize} from "../../utils.ts";
import {useContext} from "react";
import CryptoContext from "../../context/crypto-context.tsx";

const siderStyle: React.CSSProperties = {
    padding: '1rem'
};

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
    grow?: boolean,
    growPercent?: number,
    totalAmount?: number,
    totalProfit?: number,
}

const AppSider: React.FC = () => {

    const {assets} = useContext(CryptoContext)

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                    <Statistic title={capitalize(asset.id)}
                               value={asset.totalAmount}
                               precision={2}
                               valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
                               prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                               suffix="$"/>
                    <List
                        size='small'
                        dataSource={[
                            {title: "Total profit", value: asset.totalProfit, withTag: true},
                            {title: "Asset Amount", value: asset.amount, isPlain: true},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag &&
                                        <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && <Typography.Text
                                        type={asset.grow ? 'success' : 'danger'}>{item.value ? item.value.toFixed(2) : '0'}$</Typography.Text>}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    )
}

export default AppSider