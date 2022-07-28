import { FETCH_SUCESS, SAVE_EXPENSES } from '../actions';

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
  default:
    return state;
  }
};

export default wallet;
