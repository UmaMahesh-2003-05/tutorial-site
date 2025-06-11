'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  const hideNavbarRoutes = ['/login','/signup'];
  const showNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
