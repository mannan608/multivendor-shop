import React from 'react'

const ProductInformation = ({ title, data }) => {
    return (
        <>
            <div className="w-full overflow-hidden text-wrap">
                <h1 className="text-base sm:text-base md:text-xl  font-bold text-gray-800 mb-4">
                    {title}
                </h1>

                <div className="text-gray-600 text-wrap overflow-hidden transition-all duration-500 ease-in-out"
                    dangerouslySetInnerHTML={{ __html: data }}
                />
            </div>
        </>
    )
}

export default ProductInformation