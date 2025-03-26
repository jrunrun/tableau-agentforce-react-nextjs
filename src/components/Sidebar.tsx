'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  HomeIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Products', href: '/explorer', icon: ShoppingBagIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-8">
      <div className="w-8 h-8 relative">
        <Image
          src="/images/logo.svg"
          alt="AgentForce Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      <nav className="flex-1 w-full">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="flex justify-center">
                <Link
                  href={item.href}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={item.name}
                >
                  <item.icon className="w-6 h-6" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 