import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, saveExpenses, updateItem } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
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
    const { value, description, currency, method, tag } = this.state;
    const { wallet, updateItemFunc } = this.props;
    const { editor, idToEdit } = wallet;
    if (editor) {
      updateItemFunc({
        id: idToEdit,
        value: value.toString(),
        description,
        currency,
        method,
        tag,
      });
    } else {
      const id = (wallet.expenses.length === 0)
        ? 0
        : wallet.expenses[wallet.expenses.length - 1].id + 1;
      const { saveExpensesFunc } = this.props;
      saveExpensesFunc({
        id,
        value: value.toString(),
        description,
        currency,
        method,
        tag,
      });
    }
    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const { wallet } = this.props;
    const { currencies, editor } = wallet;
    const { value, description } = this.state;
    const btnAddTitle = 'Add';
    const btnEditTitle = 'Edit';
    return (
      <div>
        <form className="wallet-form">
          <label htmlFor="value">
            Value:
            <input
              className="value"
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
          <label htmlFor="method">
            Method:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
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
              <option>Food</option>
              <option>Spare time</option>
              <option>Work</option>
              <option>Transport</option>
              <option>Health</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleSave }
          >
            { editor ? btnEditTitle : btnAddTitle }
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  getCurrencies: propTypes.func.isRequired,
  wallet: propTypes.objectOf(propTypes.array).isRequired,
  saveExpensesFunc: propTypes.func.isRequired,
  updateItemFunc: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  saveExpensesFunc: (value) => dispatch(saveExpenses(value)),
  updateItemFunc: (value) => dispatch(updateItem(value)),
});

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
