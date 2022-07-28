import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount = () => {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Value:
            <input id="value" name="value" data-testid="value-input" />
          </label>
          <label htmlFor="description">
            Description:
            <input id="description" name="description" data-testid="description-input" />
          </label>
          <label htmlFor="coin">
            Currency:
            <select id="currency" name="currency" data-testid="currency-input">
              { currencies.map((currency) => (
                <option key={ currency } value="currencies">{ currency }</option>
              )) }
            </select>
          </label>
          <label htmlFor="payment">
            Payment:
            <select id="payment" name="payment" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="expense">
            Expense:
            <select id="expense" name="expense" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  getCurrencies: propTypes.func.isRequired,
  wallet: propTypes.objectOf(propTypes.array).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
