import {createContext, useEffect, useState} from "react";
import {fakeFetchCrypto, fetchAssets} from "../api.ts";
import {percentDifference} from "../utils.ts";

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

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState<CryptoItem[]>([])
    const [assets, setAssets] = useState<CryptoAsset[]>([])

    useEffect(() => {
        async function preload() {
            setLoading(true)

            const {result} = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setCrypto(result)
            setAssets(assets.map(asset => {
                const coin: CryptoItem | undefined = result.find(c => c.id === asset.id)
                if (!coin) return asset
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset
                }
            }))

            setLoading(false)
        }

        preload()
    }, [])

    return <CryptoContext.Provider value={{loading, crypto, assets}}>
        {children}
    </CryptoContext.Provider>
}

export default CryptoContext