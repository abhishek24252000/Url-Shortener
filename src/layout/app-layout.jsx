import Header from '@/components/header';
import React from 'react';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  
  return (
    <div>
      <main className="min-h-screen container mx-auto w-[95%]">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        made with 💖 by Abhishek
      </div>
    </div>
  );
}

export default AppLayout;
