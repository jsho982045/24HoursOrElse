'use client';


import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/leaderboard">Leaderboard</Link></li>
        <li><Link href="/submit">Submit</Link></li>
        <li><Link href="/profile">Profile</Link></li>
      </ul>
      <style jsx>{`
        nav {
          padding: 1rem;
          background: #333;
        }
        ul {
          list-style: none;
          display: flex;
          gap: 1rem;
        }
        li {
          color: white;
        }
        a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
