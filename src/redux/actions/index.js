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
