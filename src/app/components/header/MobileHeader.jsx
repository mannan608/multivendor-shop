import Image from 'next/image'
import Link from 'next/link'
import backBtn from "@/app/assets/images/back_btn.svg";
import searchIcon from "@/app/assets/images/mobile_search.svg";
import cartIcon from "@/app/assets/images/mobile_shopping.svg";

const MobileHeader = () => {
    return (
        <>
            <div
                className={`fixed top-0 left-0 w-full z-50 bg-white shadow-[0px_2px_4px_-4px_#0F1C330A] py-4 px-4 transition-all duration-500 ease-in-out transform  flex items-center justify-between`}
            >
                <Link href="/" className="flex items-center gap-1">
                    <Image src={backBtn} alt="back btn" />
                    <h1 className="text-base font-medium">Back</h1>
                </Link>

                <div className="flex items-center gap-2">
                    <Image src={searchIcon} alt="search" />
                    <Link href={'/cart'}>
                        <div className="relative">
                            <div className="w-8 h-8">
                                <Image src={cartIcon} alt="cart" />
                            </div>
                        </div>
                    </Link>

                </div>
            </div>

        </>
    )
}

export default MobileHeader