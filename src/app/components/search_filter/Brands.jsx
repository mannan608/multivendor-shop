import React from 'react'

const Brands = ({ brands, selected = [], onChange }) => {
    const handleToggle = (brand) => {
        const updated = selected.includes(brand)
            ? selected.filter((b) => b !== brand)
            : [...selected, brand];
        onChange(updated);
    };
    return (
        <>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Brands</h2>
                <div className="space-y-2">
                    {brands?.map((brand) => (
                        <label key={brand.id} className="flex gap-1 items-center">
                            <input type="checkbox" checked={selected.includes(brand.name)} onChange={() => handleToggle(brand.name)} />
                            {brand.name}
                        </label>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Brands