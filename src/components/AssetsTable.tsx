import {Table, TableColumnsType} from "antd";
import {useCrypto} from "../context/crypto-context.tsx";

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    amount: number;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        showSorterTooltip: { target: 'full-header' },
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
    },
];


const AssetsTable = () => {
    const {assets} = useCrypto()

    const data = assets.map(a => ({
        key: a.id,
        name: a.name,
        price: a.price,
        amount: a.amount
    }))

    return <Table<DataType>
        pagination={false}
        columns={columns}
        dataSource={data}
        showSorterTooltip={{ target: 'sorter-icon' }}
    />
}

export default AssetsTable