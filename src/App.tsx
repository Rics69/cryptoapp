import React from 'react';
import {CryptoContextProvider} from "./context/crypto-context.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";

const App: React.FC = () => {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
    )
}

export default App