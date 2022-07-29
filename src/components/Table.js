import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, editItem } from '../redux/actions';

class Table extends Component {
  render() {
    const { wallet, deleteItemFunc, editItemFunc } = this.props;
    const { expenses, editor, idToEdit } = wallet;
    let realExpenses = expenses;
    if (editor) realExpenses = expenses.filter((expense) => expense.id !== idToEdit);
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
              realExpenses.map((expense) => {
                const { id, description, tag, method,
                  value, currency, exchangeRates } = expense;
                const cambio = parseFloat(exchangeRates[currency].ask);
                const ligne = (
                  <tr key={ id }>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ parseFloat(value).toFixed(2) }</td>
                    <td>{ exchangeRates[currency].name }</td>
                    <td>{ Math.round(cambio * 100) / 100 }</td>
                    <td>{ Math.round(parseFloat(value) * cambio * 100) / 100 }</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => editItemFunc(id) }
                      >
                        Editar despesa
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => deleteItemFunc(id) }
                      >
                        Deletar
                      </button>
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
  deleteItemFunc: propTypes.func.isRequired,
  editItemFunc: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItemFunc: (value) => dispatch(deleteItem(value)),
  editItemFunc: (value) => dispatch(editItem(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
