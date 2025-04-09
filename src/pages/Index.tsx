
import React from 'react';
import Header from '@/components/Header';
import TaskManager from '@/components/TaskManager';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-taskflow-light to-white">
      <Header />
      <main className="container py-8">
        <TaskManager />
      </main>
      <footer className="py-6 mt-12 border-t">
        <div className="container text-center text-sm text-taskflow-gray">
          <p>TaskFlow - No-server task management app</p>
          <p className="mt-1">All your data is stored locally in your browser</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
