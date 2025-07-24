"use client";
import { useState } from "react";
import Image from "next/image";
import Zooming from "./Zooming";
import ProductVariations from "./ProductVariations";
import { useProductVariation } from "@/hooks/useProductVariation";

const ProductDetails = ({ product }) => {
    const [showZoom, setShowZoom] = useState(false);
    const [mainImage, setMainImage] = useState(product.thumbnail || product.images[0]?.url);



    const {
        selectedOptions,
        setSelectedOptions,
        groupedAttributes,
        handleAttributeSelect,
        isOptionAvailable,
    } = useProductVariation(product.attributes, product.variations);

    const handleGalleryClick = (imageUrl) => {
        setMainImage(imageUrl);
    };
    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="product-images flex flex-col gap-4 w-full lg:w-[380px] flex-shrink-0">
                {/* Main Image with Zoom */}
                <Zooming
                    imageSrc={mainImage}
                    showZoom={showZoom}
                    onClose={() => setShowZoom(false)}
                    onImageClick={() => window.open(mainImage, "_blank")}
                    onMouseEnterZoom={() => setShowZoom(true)}
                />

                {/* Thumbnail Gallery */}
                {product.images.length > 0 && (
                    <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
                        {!product.images.some(img => img.url === product.thumbnail) && (
                            <div
                                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 cursor-pointer ${mainImage === product.thumbnail ? "border-primary" : "border-transparent"
                                    }`}
                                onClick={() => handleGalleryClick(product.thumbnail)}
                            >
                                <Image
                                    src={product.thumbnail}
                                    alt={`${product.name} thumbnail`}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Gallery images */}
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 cursor-pointer ${mainImage === image.url ? "border-primary" : "border-transparent"
                                    }`}
                                onClick={() => handleGalleryClick(image.url)}
                            >
                                <Image
                                    src={image.url}
                                    alt={`${product.name} gallery ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="product-info flex-1">
                <div className="space-y-6">
                    <h1 className="text-base md:text-xl font-medium">{product.name}</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-semibold text-primary">
                            ${product.discount_price || product.regular_price}
                        </span>
                        {product.discount_price && (
                            <span className="text-lg text-gray-500 line-through">
                                ${product.regular_price}
                            </span>
                        )}
                    </div>
                    <ProductVariations
                        selectedOptions={selectedOptions}
                        groupedAttributes={groupedAttributes}
                        handleAttributeSelect={handleAttributeSelect}
                        isOptionAvailable={isOptionAvailable}
                    />

                    {/* Add to Cart */}
                    <button className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                        Add to Cart
                    </button>

                    {/* Product Description */}
                    <div className="prose max-w-none pt-4">
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        {/* <p className="text-gray-700">{product.description}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;