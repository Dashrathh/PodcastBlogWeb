// src/App.js
import React from 'react';
import Header from './components/Header';
function App() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-5xl font-bold">Welcome to My Website</h1>
        <p>This is a simple header demo using Tailwind CSS.</p>
      </main>
    </div>
  );
}

export default App;
