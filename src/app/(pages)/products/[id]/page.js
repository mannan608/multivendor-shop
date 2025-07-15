"use client";
import { usePreviousRoute } from '@/hooks/usePreviousRoute';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Product = () => {

    const previousUrl = usePreviousRoute();
    const currentPathname = usePathname();
    return (
        <div>

            <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-lg font-semibold">Current route: {currentPathname}</p>
                {previousUrl ? (
                    <p className="text-gray-600 mt-2">Previous route: {previousUrl}</p>
                ) : (
                    <p className="text-gray-500 mt-2">No previous route detected (first visit or page refresh)</p>
                )}

                <Link href={"/products/1"}> products id</Link>
            </div>
        </div>
    )
}

export default Product