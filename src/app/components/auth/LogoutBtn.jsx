
import { FiLogOut } from 'react-icons/fi'

const LogoutBtn = () => {
    return (
        <>
            <button className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 text-red-600 cursor-pointer">
                <FiLogOut /> Logout
            </button>
        </>
    )
}

export default LogoutBtn