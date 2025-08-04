import React from 'react'
import HeroSlider from '../slider/HeroSlider'
import Link from 'next/link'
import Image from 'next/image'
import { getBanners } from '@/app/ssrApi/bannarApi/bannarApi'

const Hero = async () => {
    const banners = await getBanners();
    const heroSliders = banners["Hero Section"];
    return (
        <div className="flex  gap-4 mt-4">
            {/* Left: Takes remaining space */}
            <div className="w-3/4">
                <HeroSlider heroSliders={heroSliders} />
            </div>

            {/* Right: Fixed width (250px) */}
            <div className="hidden lg:flex lg:w-1/4 bg-white rounded-sm px-4 py-4 shadow-sm items-center justify-center flex-col ">
                <h2 className="text-base font-medium pb-2 text-center">
                    Download the App now!
                </h2>

                <div className="w-full min-h-[109px] bg-gradient-to-r from-[#7CAAFF] to-[#00B795] rounded-sm py-3">
                    <Link
                        target="_blank"
                        href="https://play.google.com/store/apps/details?id=com.steadfast.packly"
                        className="block"
                    >
                        <Image
                            src="/hero/google.svg"
                            alt="Google Play"
                            width={117}
                            height={40}
                            className="mx-auto"
                        />
                    </Link>

                    <Link href="/#" className="block mt-2">
                        <Image
                            src="/hero/apple.svg"
                            alt="Apple Store"
                            width={117}
                            height={40}
                            className="mx-auto"
                        />
                    </Link>
                </div>

                <div className="flex mt-4 h-[100px] gap-2 w-full items-center justify-center">
                    <div className="border-2 border-primary rounded-md p-2 w-[100px] h-[100px] flex items-center justify-center">
                        <Image
                            src="/hero/qr.svg"
                            alt="QR"
                            width={100}
                            height={100}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="text-sm leading-tight">
                        <p className="text-neutral-700 mb-1">Scan the</p>
                        <h2 className="text-[18px] font-medium leading-5 text-primary">
                            QR CODE NOW
                        </h2>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Hero