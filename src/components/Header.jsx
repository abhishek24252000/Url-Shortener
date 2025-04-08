import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';

function Header() {
  const navigate = useNavigate();

  const user = false;

  return (
    <nav className="py-4 flex justify-between items-center">
      <Link to="/">
        <img src="/logo.png" className="h-16" alt="Trimmer logo" />
      </Link>

      <div>
        {!user ? (
          <Button className="cursor-pointer" onClick={() => navigate('/auth')}>
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger >
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon/>
                My Links</DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOut className='text-red-400'/>
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}

export default Header;
