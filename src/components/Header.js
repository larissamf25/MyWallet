import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  componentDidMount = () => {
    this.calculateTotal();
  }

  calculateTotal = () => {
    const { wallet } = this.props;
    const { expenses } = wallet;
    const total = expenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;
      return acc + value * exchangeRates[currency].ask;
    }, 0);
    this.setState({ total });
  }

  render() {
    const { user } = this.props;
    const { total } = this.state;
    return (
      <div>
        <p data-testid="email-field">{ user.email }</p>
        <p data-testid="total-field">{ total }</p>
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
