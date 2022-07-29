import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, saveExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount = () => {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSave = () => {
    const { value, description, currency, payment, tag } = this.state;
    const { wallet } = this.props;
    const id = wallet.expenses.length;
    const { saveExpensesFunc } = this.props;
    saveExpensesFunc({
      id,
      value: parseFloat(value),
      description,
      currency,
      payment,
      tag,
    });
    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { value, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Value:
            <input
              id="value"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              id="description"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Currency:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              { currencies.map((currency) => (
                <option key={ currency } value={ currency }>{ currency }</option>
              )) }
            </select>
          </label>
          <label htmlFor="payment">
            Payment:
            <select
              id="payment"
              name="payment"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleSave }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  getCurrencies: propTypes.func.isRequired,
  wallet: propTypes.objectOf(propTypes.array).isRequired,
  saveExpensesFunc: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  saveExpensesFunc: (value) => dispatch(saveExpenses(value)),
});

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
