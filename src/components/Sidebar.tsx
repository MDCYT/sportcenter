"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiPackage, BiUser } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image'

import Box from './Box';
import SidebarItem from './SidebarItem';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    children,
}) => {
    const supabaseClient = useSupabaseClient();

    const router = useRouter();
    const { session } = useSessionContext();

        useEffect(() => {
        if (!session) {
            router.replace("/");
        }
    }, [session, router, supabaseClient])

    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Informacion',
            active: pathname === '/dashboard',
            href: '/dashboard'
        }, {
            icon: BiPackage,
            label: 'Productos',
            active: pathname === '/dashboard/products',
            href: '/dashboard/products'
        }, {
            icon: BiUser,
            label: 'Personal',
            active: pathname === '/dashboard/personal',
            href: '/dashboard/personal'
        }
    ], [pathname])
    

    useEffect(() => {
        fetch("/api/profile")
            .then((response) => response.json())
            .then((profile) => {
                console.log(profile);
                if(!profile || profile.role === 1) return router.replace("/")
            });
    }, [router]);

    return (
        <div className={twMerge(`
            flex
            h-screen
            bg-white
        `
        )}>
            <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
            <Image className='h-8 w-auto fill-white' src={"/images/logo.png"} alt="Sport Center Logo" width={100} height={200} />
                <Box>
                    <div className='flex flex-col gap-y-5 px-5 py-4'>
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
            </div>
            <main className='h-full flex-1 overflow-y-auto py-2 px-2 md:pl-0'>
                {children}
            </main>
        </div>
    )
}

export default Sidebar;