import { DELETE_ITEM, WALLET_DATA, WALLET_EXPENSES, UPDATE_ITEM, EDIT_EXPENSE_STARTED, EDIT_EXPENSE_FINISHED } from "../actions";

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
      const expenses = [...state.expenses, action.payload] // para que o id seja passado direto
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
    case EDIT_EXPENSE_STARTED: {
      return {
        ...state,
        editor: true,
        idToEdit: action.payload
      }
    }
    case EDIT_EXPENSE_FINISHED: {
      return {
        ...state,
        editor: false,
        expenses: action.payload
      }
    }
    default:
      return state;
  }
};

export default wallet;
