'use client'
import { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

const trendingSearches = [
    "1.25IN", "1.25IN Telescope", "1.25IN Telescope Collimator", "Arctic", "Arctic Hunter",
    "Arctic Hunter Multilayer", "Awei", "Awei Y333", "Awei Y333 Portable",
    "BMW", "BMW Motorsports", "BMW Motorsports 12", "Casul"
]

const NavbarSearch = () => {

    const [query, setQuery] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const filteredResults = trendingSearches.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="relative w-full max-w-[600px]" ref={dropdownRef}>           
            <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white shadow-sm">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setShowDropdown(true)
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Search here anything ..."
                    className="w-full px-4 py-2 text-sm focus:outline-none"
                />
                <button className="bg-primary text-white px-4 py-2">
                    <FaSearch />
                </button>
            </div>
            {showDropdown && (
                <div className="absolute z-50 mt-1 w-full max-h-72 overflow-y-auto bg-white border border-gray-200 rounded shadow-lg">
                    <div className="px-4 py-2 text-sm font-semibold text-black border-b border-neutral-300">
                        Trending Searches
                    </div>
                    <ul className="divide-y divide-neutral-200">
                        {filteredResults.length > 0 ? (
                            filteredResults.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                    <span>{item}</span>
                                    <FiExternalLink className="text-gray-400" />
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-sm text-gray-500">No results found.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default NavbarSearch