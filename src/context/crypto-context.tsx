import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {fakeFetchCrypto, fetchAssets} from "../api.ts";
import {percentDifference} from "../utils.ts";

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
    name?: string
}

interface CryptoContextType {
    assets: CryptoAsset[],
    crypto: CryptoItem[],
    loading: boolean,
    addAsset: (v:CryptoAsset) => void
}

const CryptoContext = createContext<CryptoContextType>({
    assets: [],
    crypto: [],
    loading: false,
    addAsset: () => {}
})

export function CryptoContextProvider({children} : {children: ReactNode}) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState<CryptoItem[]>([])
    const [assets, setAssets] = useState<CryptoAsset[]>([])

    const mapAssets = (assets, result) => {
        return assets.map(asset => {
            const coin: CryptoItem | undefined = result.find(c => c.id === asset.id)
            if (!coin) return asset
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset
            }
        })
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)

            const {result} = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setCrypto(result)
            setAssets(mapAssets(assets, result))

            setLoading(false)
        }

        preload()
    }, [])

    const addAsset = (newAsset: CryptoAsset) => {
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }

    return <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>
        {children}
    </CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}