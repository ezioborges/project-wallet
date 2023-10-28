const initialValue = 0;

export const totalExpenses = (globalExpenses) => {
  const expenses = globalExpenses.reduce((acc, curr) => (
    acc + (curr.value * curr.exchangeRates[curr.currency].ask)
    ), initialValue);

    return expenses;
}