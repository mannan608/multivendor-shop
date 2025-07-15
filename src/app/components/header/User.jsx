'use client'
import { useState, useRef } from 'react'
import { FiUser } from 'react-icons/fi'
import { BsBoxSeam, BsClipboardData, BsHeart, BsPerson, BsStar } from 'react-icons/bs'
import Link from 'next/link'
import LoginButton from '../auth/LoginBtn'
import LogoutBtn from '../auth/LogoutBtn'

const User = () => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef()
    const auth = false

    return (
        <>
            {
                auth ? (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition cursor-pointer"
                        >
                            <FiUser size={20} />
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <Link href="/account" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                                            <BsPerson /> My Account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                                            <BsClipboardData /> My Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/returns" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                                            <BsBoxSeam /> My Returns
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/favourites" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                                            <BsHeart /> My Favourite
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/reviews" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                                            <BsStar /> My Reviews
                                        </Link>
                                    </li>
                                    <li>
                                        <LogoutBtn />
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <LoginButton />
                )
            }

        </>
    )
}

export default User
