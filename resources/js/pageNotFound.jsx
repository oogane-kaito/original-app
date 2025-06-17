// src/PageNotFound.jsx
import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">ページが見つかりません。</p>
        <p className="mt-2 text-gray-500">お探しのページは存在しないか、削除された可能性があります。</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
          ホームに戻る
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;