import ProtectedRoute from '@/app/components/protected/ProtectedRoute'
import React from 'react'

const CheckOut = () => {
    return (
        <ProtectedRoute>
            <div>CheckOut</div>
        </ProtectedRoute>
    )
}

export default CheckOut