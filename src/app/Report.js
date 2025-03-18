'use client';

export default function Report({ expenses, allowance, budgetType, onBack }) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = allowance - totalExpenses;
  const percentageUsed = (totalExpenses / allowance) * 100;

  const getWeeklyBreakdown = () => {
    const weeks = {};
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const weekNumber = Math.ceil(date.getDate() / 7);
      weeks[weekNumber] = (weeks[weekNumber] || 0) + expense.amount;
    });
    return weeks;
  };

  const getBudgetStatus = () => {
    if (percentageUsed <= 50) return "You're doing great!";
    if (percentageUsed <= 75) return "You're on track, but be careful!";
    if (percentageUsed <= 100) return "You're cutting it close!";
    return "You've exceeded your budget!";
  };
// ... existing imports and code ...

return (
    <div className="report">
      <h2>Budget Report</h2>
      <div className="report-details">
        <p>Budget Type: {budgetType}</p>
        <p>Total Allowance: ₹{allowance}</p>
        <p>Total Spent: ₹{totalExpenses.toFixed(2)}</p>
        <p>Remaining: ₹{remaining.toFixed(2)}</p>
        <p>Percentage Used: {percentageUsed.toFixed(1)}%</p>

        {budgetType === 'monthly' && (
          <div className="weekly-breakdown">
            <h3>Weekly Breakdown</h3>
            {Object.entries(getWeeklyBreakdown()).map(([week, amount]) => (
              <p key={week}>Week {week}: ₹{amount.toFixed(2)}</p>
            ))}
          </div>
        )}

        <p className="status">{getBudgetStatus()}</p>
      </div>
      <button onClick={onBack}>Back to Tracker</button>
    </div>
  );
  
}