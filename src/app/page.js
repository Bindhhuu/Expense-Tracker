'use client';

import { useState } from 'react';
import StartScreen from './StartScreen';
import BudgetSetup from './BudgetSetup';
import ExpenseTracker from './ExpenseTracker';
import styles from './page.module.css';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [budgetSet, setBudgetSet] = useState(false);
  const [budgetType, setBudgetType] = useState('');
  const [allowance, setAllowance] = useState(0);
  const [expenses, setExpenses] = useState([]);

  return (
    <div className={styles.container}>
      {!started ? (
        <StartScreen onStart={() => setStarted(true)} />
      ) : !budgetSet ? (
        <BudgetSetup 
          onBudgetSet={(type, amount) => {
            setBudgetType(type);
            setAllowance(amount);
            setBudgetSet(true);
          }}
        />
      ) : (
        <ExpenseTracker 
          budgetType={budgetType}
          allowance={allowance}
          expenses={expenses}
          setExpenses={setExpenses}
        />
      )}
    </div>
  );
}