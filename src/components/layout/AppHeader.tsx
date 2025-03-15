import React, {useEffect, useState} from "react";
import {Button, Layout, Modal, Select, Space, Drawer} from "antd";
import {useCrypto} from "../../context/crypto-context.tsx";
import CoinInfoModal from "../CoinInfoModal.tsx";
import AddAssetForm from "../AddAssetForm.tsx";

const headerStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

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


const AppHeader: React.FC = () => {
    const [select, setSelect] = useState(false)
    const [coin, setCoin] = useState<CryptoItem | null>(null)
    const [drawer, setDrawer] = useState(false)
    const [modal, setModal] = useState(false)
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
        const selectedCoin = crypto.find(c => c.id === value) || null
        setCoin(selectedCoin)
        setModal(true)
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
        <Button onClick={() => setDrawer(true)} type="primary">Add Asset</Button>
        <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
            <CoinInfoModal coin={coin}/>
        </Modal>

        <Drawer width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
            <AddAssetForm onClose={() => setDrawer(false)}/>
        </Drawer>
    </Layout.Header>
}

export default AppHeader