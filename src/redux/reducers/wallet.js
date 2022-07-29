import { DELETE_ITEM, EDIT_ITEM, FETCH_SUCESS,
  SAVE_EXPENSES, UPDATE_ITEM } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_SUCESS:
    return { ...state, currencies: action.currencies };
  case SAVE_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case DELETE_ITEM:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_ITEM:
    return { ...state, editor: true, idToEdit: action.id };
  case UPDATE_ITEM:
    return {
      ...state,
      editor: false,
      idToEdit: -1,
      expenses: state.expenses.map((expense) => ((expense.id === action.expense.id)
        ? { ...expense, ...action.expense }
        : expense)),
    };
  default:
    return state;
  }
};

export default wallet;
