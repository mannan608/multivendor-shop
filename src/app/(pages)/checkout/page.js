"use client"
import ProtectedRoute from '@/app/components/protected/ProtectedRoute'
import { useSelectedCartItems } from '@/hooks/useSelectedCartItems';
import React from 'react'
import { useSelector } from 'react-redux';

const CheckOut = () => {
    const { isAuthenticated } = useSelector((state) => state.auth || {});


    const { selectedProducts, isLoading } = useSelectedCartItems();

    console.log(" selectedProducts   ", selectedProducts);

    // const apiCartItems = data?.data ? formatProductData(data.data) : [];

    // const cartItems = Array.isArray(isAuthenticated && apiCartItems ? apiCartItems : guestCart)
    //     ? (isAuthenticated && apiCartItems ? apiCartItems : guestCart)
    //     : [];

    // const groupedItems = groupByShop(cartItems);
    return (
        <ProtectedRoute>
            <div>CheckOut</div>
        </ProtectedRoute>
    )
}

export default CheckOut