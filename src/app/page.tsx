import React from 'react';
import Feed from '@/app/feed/page';
import TitleCard from '@/components/title_card';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <TitleCard />
        <div className="mt-8">
          <Feed />
        </div>
      </main>
    </div>
  );
};

export default MainPage;