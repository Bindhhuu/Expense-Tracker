'use client';

import { useState } from 'react';

export default function BudgetSetup({ onBudgetSet }) {
  const [type, setType] = useState('weekly');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBudgetSet(type, parseFloat(amount));
  };

  return (
    <div className="budget-setup">
      <h2>Set Your Budget</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="weekly"
              checked={type === 'weekly'}
              onChange={(e) => setType(e.target.value)}
            />
            Weekly
          </label>
          <label>
            <input
              type="radio"
              value="monthly"
              checked={type === 'monthly'}
              onChange={(e) => setType(e.target.value)}
            />
            Monthly
          </label>
        </div>
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter your allowance"
            required
          />
        </div>
        <button type="submit">Set Budget</button>
      </form>
    </div>
  );
}