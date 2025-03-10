import React from 'react';
import {Layout} from 'antd';
import AppHeader from "./components/layout/AppHeader.tsx";
import AppSider from "./components/layout/AppSider.tsx";
import AppContent from "./components/layout/AppContent.tsx";
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