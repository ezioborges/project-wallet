import { totalExpenses } from "../../util/totalExpenses";
import { DELETE_ITEM, WALLET_DATA, WALLET_EXPENSES, UPDATE_ITEM } from "../actions";

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WALLET_DATA: {
      return {
        ...state,
        currencies: action.payload,
      };
    }
    case WALLET_EXPENSES: {
      const expenses = [...state.expenses, action.payload]
        .map((exp, index) => {
          exp.id = index
          return exp
        }) 

      return {
        ...state,
        expenses: expenses,
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        expenses: action.payload,
      };
    }
    case UPDATE_ITEM: {
      const updatedExpense = action.payload;
      const updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === updatedExpense.id) {
          return updatedExpense;
        } else {
          return expense;
        }
      });

      return {
        ...state,
        expenses: updatedExpenses,
      }
    }
    default:
      return state;
  }
};

export default wallet;
