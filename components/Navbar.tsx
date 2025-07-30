'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  BellIcon,
  UserCircleIcon,
  MenuIcon,
  LogOutIcon
} from 'lucide-react';


interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { userInfo, logout } = useMe();
  return (
    <nav className="fixed top-0 right-0 left-0 h-16 bg-white shadow-sm z-10">
      <div className="h-full flex items-center justify-between">
        {/* Left section - Menu toggle and Logo */}
        <div className="flex items-center pl-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <Link href="/main">
              <div className="flex items-center hover:opacity-80 transition-opacity">
                <div className="relative h-12 w-48 ml-2">
                  <Image
                    src="/images/Gammon.png"
                    alt="Gammon Gems Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                <div className="ml-4 hidden sm:block space-y-1">
                  <h1 className="text-lg font-semibold text-blue-600 whitespace-nowrap">Project Document Management System</h1>
                  <h2 className="whitespace-nowrap">
                    <span className="text-lg font-semibold text-red-600">J0002</span>
                    <span className="text-sm font-normal text-gray-600">-Gems T4 Mobile demo</span>
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right section - Notifications and Profile */}
        <div className="flex items-center gap-2 pr-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="gap-2">
              <UserCircleIcon className="h-5 w-5" />
              <span className="hidden md:inline">{userInfo?.name || 'Guest User'}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOutIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}