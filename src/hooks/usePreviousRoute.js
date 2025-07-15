"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function usePreviousRoute() {
    const pathname = usePathname();
    const previousRouteRef = useRef(null);
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else {
            previousRouteRef.current = sessionStorage.getItem('currentRoute');
        }

        sessionStorage.setItem('currentRoute', pathname);
    }, [pathname]);

    return previousRouteRef.current;
}