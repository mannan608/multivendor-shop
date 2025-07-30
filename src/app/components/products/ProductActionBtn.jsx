"use client"
import { useProductVariation } from '@/hooks/useProductVariation';
import ProductVariations from './ProductVariations'
import { PrimaryBtn } from '../ui/button/PrimaryBtn';
import OutlineBtn from '../ui/button/OutlineBtn';

const ProductActionBtn = ({ product }) => {

    const {
        selectedOptions,
        groupedAttributes,
        handleAttributeSelect,
        isOptionAvailable,
    } = useProductVariation(product.attributes, product.variations);

    return (
        <>
            <ProductVariations
                selectedOptions={selectedOptions}
                groupedAttributes={groupedAttributes}
                handleAttributeSelect={handleAttributeSelect}
                isOptionAvailable={isOptionAvailable}
            />
            <div className="flex gap-3 mt-5">
                <OutlineBtn />
                <PrimaryBtn />
            </div>


        </>
    )
}

export default ProductActionBtn