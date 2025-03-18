'use client';

import Image from 'next/image';

export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <div className="start-image">
        <Image
          src="/budget-image.jpeg"
          alt="Budget Management"
          width={300}
          height={300}
          priority
        />
      </div>
      <h1>Budget Tracker</h1>
      <p>Track your expenses and manage your budget effectively</p>
      <button className="start-button" onClick={onStart}>Start Budgeting</button>
    </div>
  );
}