import React from 'react'
import { useGetHistoryOrdersList } from '../apis/orders/getHistoryOrdersList.api';

const TestComp = () => {
    const { data } = useGetHistoryOrdersList()
    console.log("🚀 ~ data:", data);
    return (
        <div>test</div>
    )
}

export default TestComp