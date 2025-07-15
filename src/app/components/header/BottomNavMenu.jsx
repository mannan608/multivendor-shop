'use client';

import { usePathname } from 'next/navigation';
import BottomMenuList from './BottomMenuList';

const showRoutes = ['/', '/category', '/cart', '/user'];

const BottomNavMenu = () => {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    const shouldShow = showRoutes.includes(pathname);

    if (!shouldShow) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white z-50 shadow-[0_2px_6px_1px_rgba(0,0,0,0.5)] md:hidden">
            <BottomMenuList isActive={isActive} />
        </div>
    );
};

export default BottomNavMenu;
