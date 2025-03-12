interface CoinProps {
    coin: {
        name: string
    } | null
}

const CoinInfoModal = ({coin}: CoinProps) => {
    return <h2>{coin ? coin.name : "Монета не выбрана"}</h2>
}

export default CoinInfoModal