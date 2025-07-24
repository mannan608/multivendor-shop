"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Zooming = ({ imageSrc, showZoom, onClose, onImageClick, onMouseEnterZoom }) => {
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imgRef.current) return;

        const { left, top, width, height } = imgRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    return (
        <div className="relative flex gap-4 w-full">
            {/* Main Image Container */}
            <div
                className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
                ref={imgRef}
                onMouseEnter={onMouseEnterZoom}
                onMouseLeave={onClose}
                onMouseMove={handleMouseMove}
                onClick={onImageClick}
            >
                <Image
                    src={imageSrc}
                    alt="Zoomable Product Image"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 380px"
                />
            </div>

            {/* Zoom Preview Container */}
            {showZoom && (
                <div className="hidden lg:block w-[380px] h-[380px] border border-gray-200 rounded-lg overflow-hidden">
                    <div
                        className="w-full h-full bg-no-repeat"
                        style={{
                            backgroundImage: `url(${imageSrc})`,
                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            backgroundSize: '200%',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Zooming;