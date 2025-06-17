// src/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">ようこそ！</h1>
        <p className="mt-4 text-lg text-gray-600">これはホームページです。</p>
        <p className="mt-2 text-gray-500">
          このページでは、アプリケーションの基本情報や機能を紹介します。
        </p>
        <a href="/about" className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
          Aboutページへ
        </a>
      </div>
    </div>
  );
};

export default Home;