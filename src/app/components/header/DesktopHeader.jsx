import Image from 'next/image'
import Link from 'next/link'
import NavbarSearch from '../share/NavbarSearch'
import CartCount from './CartCount'
import User from './User'
import Categories from '../share/Categories'

const DesktopHeader = () => {
    return (
        <>
            <header className="bg-[#0f172a]">
                <div className="container-fluid mx-auto px-5 py-4 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="hidden sm:block">
                            <div className="relative w-[120px] h-[40px]">
                                <Image
                                    src="/images/logo.svg"
                                    alt="logo"
                                    fill
                                    className="object-contain" priority
                                />
                            </div>
                        </div>
                        <div className="block sm:hidden">
                            <Image src="/images/logo.svg" alt="mobile logo" width={40} height={40} />
                        </div>
                    </Link>
                    <div className="flex-1 hidden lg:flex justify-center px-4">
                        <div className="w-full max-w-[600px]">
                            <NavbarSearch />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-5 text-sm">
                        <Link href="/cart" className="relative">
                            <div className="relative w-8 h-8">
                                <Image src="/images/cart_icon.svg" width={28} height={28} alt="cart" />
                                <CartCount />
                            </div>
                        </Link>
                        <User />
                    </div>

                </div>
            </header>

            <nav className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] text-neutral-900 relative hidden md:block">
                <div className="container-fluid mx-auto flex items-center justify-between py-4 px-5 relative">
                    <div className="flex justify-between items-center gap-2 divide-x-1 divide-gray-200">
                        <Categories />
                        <div className="hidden xl:flex items-center justify-around gap-5 pl-2 menu-link">
                            <Link
                                className="hover:text-primary transition-colors "
                                href="/collection?category_id=1&category_name=Women's%20%26%20Girls'%20Fashion"
                            >
                                Women's &amp; Girls' Fashion
                            </Link>
                            <Link
                                className="hover:text-primary transition-colors "
                                href="/collection?category_id=2&category_name=Men's%20%26%20Boys'%20Fashion"
                            >
                                Men's &amp; Boys' Fashion
                            </Link>
                            <Link
                                className="hover:text-primary transition-colors "
                                href="/collection?category_id=3&category_name=Electronic%20Accessories"
                            >
                                Electronic Accessories
                            </Link>
                            <Link
                                className="hover:text-primary transition-colors "
                                href="/collection?category_id=4&category_name=TV%20%26%20Home%20Appliances"
                            >
                                TV &amp; Home Appliances
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-4 text-sm">
                        <Link className="flex items-center gap-2 hover:text-primary transition-colors " href="/track-order" >
                            <Image src="/images/track_order_icon.svg" alt="TRACK ORDER" width={15} height={15} />
                            <span className="text-xs">TRACK ORDER</span>
                        </Link>
                        <Link
                            className="flex items-center gap-2 hover:text-primary transition-colors "
                            href="/helpcenter"
                        >
                            <Image src="/images/help_center_icon.svg" alt="HELP CENTER" width={15} height={15} />
                            <span className="text-xs">HELP CENTER</span>
                        </Link>
                        <Link
                            className="flex items-center gap-2 hover:text-primary transition-colors "
                            href="/sellwithus"
                        >
                            <Image src="/images/sell_with_us.svg" alt="SELL WITH US" width={15} height={15} />
                            <span className="text-xs">SELL WITH US</span>
                        </Link>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default DesktopHeader