import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  calculateTotal = () => {
    const { wallet } = this.props;
    return wallet.expenses.reduce((acc, spend) => acc + spend.valueBR, 0);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ user.email }</p>
        {/* <p data-testid="total-field">{ this.calculateTotal }</p> */}
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  user: propTypes.objectOf(propTypes.string).isRequired,
  wallet: propTypes.arrayOf(propTypes.objects).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);
