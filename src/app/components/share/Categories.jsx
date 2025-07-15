'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa'

const Categories = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const toggleDropdown = () => {
        setIsOpen(prev => !prev)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="pr-4">
                <span
                    className="flex items-center gap-2 cursor-pointer categories-trigger"
                    onClick={toggleDropdown}
                >
                    <FaBars className="w-5 h-5 mr-2" />
                    <h5 className="font-semibold text-[16px]">Categories</h5>
                </span>
            </div>

            <div
                className={`absolute top-full left-0 w-full z-50 transition-all duration-300 
                    ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
                `}
            >
                <div className="bg-white shadow-md p-4">Your dropdown content</div>
            </div>
        </div>
    )
}

export default Categories
