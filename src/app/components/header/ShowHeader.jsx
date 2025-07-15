'use client';

import useIsMobile from '@/hooks/useIsMobile';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const homeRoute = ['/'];

const ShowHeader = () => {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const [showDesktop, setShowDesktop] = useState(true);
    const [showMobile, setShowMobile] = useState(false);


    useEffect(() => {
        const isInShowRoutes = homeRoute.includes(pathname);

        if (isMobile) {
            setShowDesktop(isInShowRoutes);
            setShowMobile(!isInShowRoutes);
        } else {
            setShowDesktop(true);
            setShowMobile(false);
        }
    }, [pathname, isMobile]);




    return (
        <>
            {showDesktop && (<DesktopHeader />)}
            {showMobile && (<MobileHeader text="Mobile Header" />)}
        </>
    );
};

export default ShowHeader;
