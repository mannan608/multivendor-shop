import React from 'react'

const OutlineBtn = ({ handleAction, text }) => {
    return (
        <>
            <button
                onClick={handleAction}
                className=" w-full h-10 lg:h-12 border border-primary-500 rounded-md bg-primary-50 px-4 text-primary-500 text-sm sm:text-base font-medium hover:bg-primary-50 transition-colors duration-150 cursor-pointer"

            >
                {text}
            </button>
        </>
    )
}

export default OutlineBtn