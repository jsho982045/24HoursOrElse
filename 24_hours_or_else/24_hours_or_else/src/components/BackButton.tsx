'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component
import { useState } from 'react';

export default function BackButton() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      onClick={() => {
        setIsClicked(true);
        setTimeout(() => {
          router.back();
          setIsClicked(false);
        }, 150); // Adds a slight delay for the click effect
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-2 bg-transparent transition-all duration-200 ease-in-out ${
        isHovered ? 'opacity-50 scale-150' : 'opacity-100 scale-100'
      } ${isClicked ? 'transform scale-90' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      <Image
        src="/back.png" // Replace with your back arrow image path
        alt="Back"
        width={30} // Adjust width as needed
        height={30} // Adjust height as needed
      />
    </button>
  );
}
