import React from 'react'

const Brands = () => {
    return (
        <>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Brands</h2>
                <ul className="space-y-2">
                    <li><input type="checkbox" /> Hitachi</li>
                    <li><input type="checkbox" /> Walton</li>
                    <li><input type="checkbox" /> Marcel</li>
                    <li><input type="checkbox" /> Samsung</li>
                    <li><input type="checkbox" /> Whirlpool</li>
                </ul>
            </div>
        </>
    )
}

export default Brands