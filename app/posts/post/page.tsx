'use client';

import { actionInsertPost } from "@/app/lib/actions";
import { insertPost } from "@/app/lib/db";
import { useState } from "react";

function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white max-w-[680px] mx-auto">
      <form action={actionInsertPost} className="w-full max-w-[500px]">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Submit
        </button>
      </form>
    </main>
  );
}
export default Home;
