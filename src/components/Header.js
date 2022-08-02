import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    const { expenses } = wallet;
    return (
      <div className="header">
        <FaUserAlt className="icon" />
        <p className="email" data-testid="email-field">{ user.email }</p>
        <p className="title"><span style={{ color: "#1BB81B" }}>T</span>rybe<span style={{ color: "#1BB81B" }}>W</span>allet</p>
        <div className="total-container">
          <p>R$</p>
          <p data-testid="total-field">
            { expenses.reduce((acc, expense) => {
              const { value, currency, exchangeRates } = expense;
              return acc + parseFloat(value) * parseFloat(exchangeRates[currency].ask);
            }, 0).toFixed(2) }
          </p>
          {/* <p data-testid="header-currency-field">BRL</p> */}
        </div>
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
