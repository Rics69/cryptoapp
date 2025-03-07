import {cryptoAssets, cryptoData} from "./data.ts";

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

export function fakeFetchCrypto(): Promise<CryptoData> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 2000)
    })
}

export function fetchAssets(): Promise<CryptoAsset[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 2000)
    })
}