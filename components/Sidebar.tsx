'use client';


import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  CalendarIcon,
  FileTextIcon,
  FileEditIcon,
  CheckSquareIcon,
  ClipboardListIcon,
  SendIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  UsersIcon,
  MailIcon,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { name: 'T1 Master Schedule', path: '/t1-master-schedule', icon: CalendarIcon },
    { name: 'T2 Design Briefs', path: '/t2-design-briefs', icon: FileTextIcon },
    { name: 'T3 Modifications', path: '/t3-modification', icon: FileEditIcon },
    { name: 'T4 Permit to Load', path: '/t4-permit-to-load', icon: CheckSquareIcon },
    { name: 'Document Register', path: '/document-register', icon: ClipboardListIcon },
    { name: 'Transmittals', path: '/transmittals', icon: SendIcon },
    { name: 'LIR Responses', path: '/lir-responses', icon: MessageSquareIcon },
    { name: 'Check Certificates', path: '/check-certificates', icon: CheckCircleIcon },
    { name: 'Users', path: '/users', icon: UsersIcon },
    { name: 'Email Log', path: '/email-log', icon: MailIcon },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} fixed left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden`}>
      <Button
        onClick={onToggle}
        variant="ghost"
        size="icon"
        className="absolute -right-2 top-4 z-10 w-10 h-10 hover:bg-transparent"
      >
        <ChevronRight
          className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-gray-700 hover:text-gray-900`}
        />
      </Button>
      <nav className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 py-4 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className="block"
            >
              <Button
                variant={item.name === 'Dashboard' ? 'secondary' : 'ghost'}
                className={`w-full justify-start gap-3 ${!isOpen && 'justify-center'} hover:bg-gray-100 transition-colors`}
              >
                <Icon className="h-5 w-5" />
                {isOpen && <span>{item.name}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}