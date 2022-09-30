import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FaWallet } from 'react-icons/fa';
import { saveLogin } from '../redux/actions';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
      btnDisabled: true,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateLogin);
  }

  validateLogin = () => {
    const { emailInput, passwordInput } = this.state;
    const matcher = /^[a-zA-Z0-9.!#$%&*+/=?^_{|}~-]+@[a-zA-Z0-9.-]+\.com$/img;
    const minLenPass = 6;
    if (passwordInput.length >= minLenPass && matcher.test(emailInput)) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleLogin = () => {
    const { emailInput } = this.state;
    const { saveLoginFunc } = this.props;
    saveLoginFunc(emailInput);
    this.setState({ redirect: true });
  }

  render() {
    const { btnDisabled, redirect } = this.state;
    if (redirect) return <Redirect to="/MyWallet/carteira" />;
    return (
      <div>
        <form className="login-form">
          <FaWallet className="icon" />
          <h1>my wallet</h1>
          <input
            data-testid="email-input"
            placeholder="email"
            name="emailInput"
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            placeholder="senha"
            name="passwordInput"
            type="password"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ btnDisabled }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
          <a href="www.google.com">forgot the password</a>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  saveLoginFunc: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveLoginFunc: (value) => dispatch(saveLogin(value)),
});

export default connect(null, mapDispatchToProps)(Login);
