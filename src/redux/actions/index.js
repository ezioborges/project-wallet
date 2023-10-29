import getCurrencies from "../../services/getCurrencies";

export const USER_DATA = 'USER_DATA';
export const WALLET_DATA = 'WALLET_DATA'; 
export const WALLET_EXPENSES = 'WALLET_EXPENSES';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const EDIT_EXPENSE_STARTED = 'EDIT_EXPENSE_STARTED';
export const EDIT_EXPENSE_FINISHED = 'EDIT_EXPENSE_FINISHED';

export const userAction = (user) => ({
  type: USER_DATA,
  payload: user
}) 

export const walletData = (wallet) => ({
  type: WALLET_DATA,
  payload: wallet
})

export const walletExpenses = (expense) => ({
  type: WALLET_EXPENSES, 
  payload: expense
})

export const deletItem = (deleted) => ({
  type: DELETE_ITEM,
  payload: deleted
})

export const updateItem = (updated) => ({
  type: UPDATE_ITEM,
  payload: updated
})

export const editExpenseStarted = (id) => ({
  type: EDIT_EXPENSE_STARTED,
  payload: id
})

export const editExpenseFinished = (expense) => ({
  type: EDIT_EXPENSE_FINISHED,
  payload: expense
})

export const fetchCurrency = () => {
  return async (dispatch) => {
    try {
      const response = await getCurrencies();
      delete response.USDT;
      dispatch(walletData(Object.keys(response)));
    } catch (error) {
      console.error('Erro na busca de dados', error)
    }
  }
}