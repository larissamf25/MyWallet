import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    const { expenses } = wallet;
    return (
      <div>
        <p data-testid="email-field">{ user.email }</p>
        <p data-testid="total-field">
          { expenses.reduce((acc, expense) => {
            const { value, currency, exchangeRates } = expense;
            return acc + parseFloat(value) * parseFloat(exchangeRates[currency].ask);
          }, 0).toFixed(2) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  user: propTypes.objectOf(propTypes.string).isRequired,
  wallet: propTypes.objectOf(propTypes.array).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);
