"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import Zooming from './Zooming'

const ProductImage = ({ product }) => {

    const [showZoom, setShowZoom] = useState(false);
    const [mainImage, setMainImage] = useState(product.thumbnail || product.images[0]?.url);
    const handleGalleryClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    return (
        <>
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
        </>
    )
}

export default ProductImage