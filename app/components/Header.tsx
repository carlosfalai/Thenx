import { Link } from '@remix-run/react';

export default function Header() {
  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          THENX Community Forum
        </Link>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/new" className="hover:text-gray-300">New Post</Link>
        </nav>
      </div>
    </header>
  );
}
