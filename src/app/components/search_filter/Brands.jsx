import React from 'react'

const Brands = ({ brands, filters, handleBrandChange }) => {

    return (
        <>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Brands</h2>
                <div className="space-y-2">
                    {brands?.map((brand) => (
                        <label key={brand.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filters.brand.includes(String(brand.id))}
                                onChange={() => handleBrandChange(brand.id)}
                            />
                            <span>{brand.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Brands