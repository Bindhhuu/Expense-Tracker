'use client';

import { useState, useEffect } from 'react';
import Report from './Report';

export default function ExpenseTracker({ budgetType, allowance, expenses, setExpenses }) {
  const [amount, setAmount] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodComplete, setPeriodComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedAllowance = localStorage.getItem('allowance');
    const savedBudgetType = localStorage.getItem('budgetType');
    
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    if (savedAllowance) {
      setAllowance(parseFloat(savedAllowance));
    }
    if (savedBudgetType) {
      setBudgetType(savedBudgetType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('allowance', allowance);
    localStorage.setItem('budgetType', budgetType);
  }, [expenses, allowance, budgetType]);

  useEffect(() => {
    const startDate = new Date(expenses[0]?.date || Date.now());
    const diffTime = Math.abs(currentDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (budgetType === 'weekly' && diffDays >= 7) {
      setPeriodComplete(true);
    } else if (budgetType === 'monthly' && diffDays >= 28) {
      setPeriodComplete(true);
    }
  }, [expenses, budgetType, currentDate]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };
    setExpenses([...expenses, newExpense]);
    setAmount('');
  };

  const groupExpensesByDay = () => {
    const grouped = {};
    expenses.forEach(expense => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = {
          expenses: [],
          total: 0
        };
      }
      grouped[date].expenses.push(expense);
      grouped[date].total += expense.amount;
    });
    return grouped;
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = allowance - totalExpenses;

  return (
    <div className="expense-tracker">
      <div className="current-date">
        {currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>

      {!showReport ? (
        <>
          <h2>Track Your Expenses</h2>
          <div className="budget-info">
            <p>Budget Type: {budgetType}</p>
            <p>Total Allowance: ₹{allowance}</p>
            <p>Remaining: ₹{remaining.toFixed(2)}</p>
          </div>

          <form onSubmit={handleAddExpense}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter expense amount"
              required
            />
            <button type="submit">Add Expense</button>
          </form>

          <div className="expense-list">
            {Object.entries(groupExpensesByDay()).map(([date, dayData]) => (
              <div key={date} className="expense-day">
                <div className="day-header">
                  <h3>{new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</h3>
                  <p className="day-total">Daily Total: ₹{dayData.total.toFixed(2)}</p>
                </div>
                <div className="day-expenses">
                  {dayData.expenses.map((expense, index) => (
                    <div key={index} className="expense-item">
                      <span>{new Date(expense.date).toLocaleTimeString()}</span>
                      <span>₹{expense.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="report-buttons">
            <button onClick={() => setShowReport('daily')}>Daily Report</button>
            {periodComplete && (
              <>
                <button onClick={() => setShowReport('weekly')}>Weekly Report</button>
                <button onClick={() => setShowReport('monthly')}>Monthly Report</button>
              </>
            )}
          </div>
        </>
      ) : (
        <Report 
          expenses={expenses}
          allowance={allowance}
          budgetType={budgetType}
          reportType={showReport}
          onBack={() => setShowReport(false)}
        />
      )}
    </div>
  );
}