import React from 'react'
import Categories from './Categories'
import Brands from './Brands'

const SidebarFilter = ({ categories, filters, handleCategoryChange, brands, handleBrandChange }) => {
    return (
        <>
            <Categories
                categories={categories}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
            />
            <Brands
                brands={brands}
                filters={filters}
                handleBrandChange={handleBrandChange}
            />
        </>
    )
}

export default SidebarFilter