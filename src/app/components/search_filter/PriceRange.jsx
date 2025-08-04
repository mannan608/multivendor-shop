import React from 'react'

const PriceRange = () => {
    return (
        <>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Price range</h2>
                <input type="range" min={0} max={5000} className="w-full" />
            </div>
        </>
    )
}

export default PriceRange