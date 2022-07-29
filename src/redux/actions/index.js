import fetchAPI from '../../services';

// Coloque aqui suas actions
export const SAVE_LOGIN = 'SAVE_LOGIN';

export const saveLogin = (email) => ({
  type: SAVE_LOGIN,
  email,
});

export const FETCH_SUCESS = 'FETCH_SUCESS';

const getCurrenciesSucess = (currencies) => ({
  type: FETCH_SUCESS,
  currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await fetchAPI();
    delete response.USDT;
    const siglas = Object.values(response).map((currency) => currency.code);
    dispatch(getCurrenciesSucess(siglas));
  };
}

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpensesSucess = (expense) => ({
  type: SAVE_EXPENSES,
  expense,
});

export function saveExpenses(expense) {
  return async (dispatch) => {
    const response = await fetchAPI();
    delete response.USDT;
    expense.exchangeRates = response;
    dispatch(saveExpensesSucess(expense));
  };
}

export const DELETE_ITEM = 'DELETE_ITEM';

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  id,
});

export const EDIT_ITEM = 'EDIT_ITEM';

export const editItem = (id) => ({
  type: EDIT_ITEM,
  id,
});

export const UPDATE_ITEM = 'UPDATE_ITEM';

export const updateItem = (expense) => {
  console.log(expense);
  return {
    type: UPDATE_ITEM,
    expense,
  };
};
