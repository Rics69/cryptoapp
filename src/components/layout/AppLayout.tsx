import {Layout, Spin} from "antd";
import AppHeader from "./AppHeader.tsx";
import AppSider from "./AppSider.tsx";
import AppContent from "./AppContent.tsx";
import {useCrypto} from "../../context/crypto-context.tsx";

export default function AppLayout() {

    const {loading} = useCrypto()

    if (loading) {
        return <Spin fullscreen/>
    }

    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
        </Layout>
    )
}