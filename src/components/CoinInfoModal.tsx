import {Divider, Flex, Tag, Typography} from "antd";

interface CoinProps {
    coin: {
        name: string
        icon: string
        symbol: string
        priceChange1h: number
        priceChange1d: number
        priceChange1w: number
        price: number
        priceBtc: number
        marketCap: number
        contractAddress: string
    } | null
}

const CoinInfoModal = ({coin}: CoinProps) => {
    return (
        <>
            <Flex align="center">
                <img src={coin?.icon} alt={coin?.name} style={{width: 40, marginRight: 10}}/>
                <Typography.Title level={2} style={{margin: 0}}>({coin?.symbol}) {coin?.name}</Typography.Title>
            </Flex>
            <Divider/>
            {coin?.priceChange1h && <Typography.Paragraph>
                <Typography.Text strong>1 hour: </Typography.Text>
                <Tag color={coin?.priceChange1h > 0 ? 'green' : 'red'}>{coin?.priceChange1h}%</Tag>
                <Typography.Text strong>1 day: </Typography.Text>
                <Tag color={coin?.priceChange1d > 0 ? 'green' : 'red'}>{coin?.priceChange1d}%</Tag>
                <Typography.Text strong>1 week: </Typography.Text>
                <Tag color={coin?.priceChange1w > 0 ? 'green' : 'red'}>{coin?.priceChange1w}%</Tag>
            </Typography.Paragraph>}
            {coin?.price && <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>}
            {coin?.priceBtc && <Typography.Paragraph>
                <Typography.Text strong>Price BTC: </Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>}
            {coin?.marketCap && <Typography.Paragraph>
                <Typography.Text strong>Market Cap: </Typography.Text>
                {coin.marketCap}$
            </Typography.Paragraph>}
            {coin?.contractAddress && <Typography.Paragraph>
                <Typography.Text strong>Contract Address: </Typography.Text>
                {coin.contractAddress}
            </Typography.Paragraph>}
        </>
    )
}

export default CoinInfoModal