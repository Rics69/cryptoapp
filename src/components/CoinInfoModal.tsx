import {Divider, Flex, Typography} from "antd";

interface CoinProps {
    coin: {
        name: string
        icon: string
        symbol: string
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
            <Typography.Paragraph>

            </Typography.Paragraph>
        </>
    )
}

export default CoinInfoModal