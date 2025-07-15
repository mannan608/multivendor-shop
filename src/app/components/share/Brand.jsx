import React from 'react'

const Brand = ({ title, message }) => {
    return (
        <div className="mb-8 flex flex-col items-center justify-center text-center">
            <Image src="/images/fav_icon.svg" alt="logo" width={64} height={64} />
            <h1 className="text-2xl text-neutral-600 font-semibold mt-4">{title}</h1>
            <p className="text-sm text-neutral-600 font-normal mt-2">{message}</p>
        </div>
    )
}

export default Brand