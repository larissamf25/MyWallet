import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  handleEdit = () => {

  }

  handleDelete = () => {

  }

  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => {
                const { description, payment, value, currency, exchangeRates } = expense;
                const cambio = exchangeRates[currency].ask;
                const ligne = (
                  <tr>
                    <td>{ description }</td>
                    <td>{ expense.tag }</td>
                    <td>{ payment }</td>
                    <td>{ value.toFixed(2) }</td>
                    <td>{ exchangeRates[currency].name }</td>
                    <td>{ Math.round(cambio * 100) / 100 }</td>
                    <td>{ Math.round(value * cambio * 100) / 100 }</td>
                    <td>Real</td>
                    <td>
                      <button type="button">Editar</button>
                      <button type="button">Excluir</button>
                    </td>
                  </tr>
                );
                return ligne;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  wallet: propTypes.objectOf(propTypes.array).isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Table);
