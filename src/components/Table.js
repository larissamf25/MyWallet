import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { BiRestaurant } from 'react-icons/bi';
import { RiHealthBookFill } from 'react-icons/ri';
import { FaCarAlt, FaUmbrellaBeach } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { deleteItem, editItem } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      rank: false,
    };
  }

  handleFilter = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { wallet, deleteItemFunc, editItemFunc } = this.props;
    const { rank } = this.state;
    const { expenses, editor, idToEdit } = wallet;
    let realExpenses = expenses;
    if (expenses.length > 0 && rank) {
      realExpenses.sort((a, b) => (
        a.exchangeRates[a.currency].ask * a.value - b.exchangeRates[b.currency].ask * b.value
      ));
    }
    if (editor) realExpenses = expenses.filter((expense) => expense.id !== idToEdit);
    return (
      <div>
        <p className="table-title">Exchange's Table</p>
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>nº</th>
              <th>Description</th>
              <th>Tag</th>
              <th>Method</th>
              <th>Value</th>
              <th>Currency</th>
              <th>Rate</th>
              <th>Value (BRL)</th>
              <th>Currency default</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {
              realExpenses.map((expense, index) => {
                const { id, description, tag, method,
                  value, currency, exchangeRates } = expense;
                const cambio = parseFloat(exchangeRates[currency].ask);
                const ligne = (
                  <tr key={ id }>
                    <td>{ index + 1 }</td>
                    <td>{ description }</td>
                    <td>{ tag === 'Food' ? <BiRestaurant /> : tag === 'Health' ? <RiHealthBookFill /> : tag === 'Transport' ? <FaCarAlt /> : tag === 'Work' ? <MdWork /> : <FaUmbrellaBeach /> }</td>
                    <td>{ method }</td>
                    <td>{ parseFloat(value).toFixed(2) }</td>
                    <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                    <td>{ Math.round(cambio * 100) / 100 }</td>
                    <td>{ Math.round(parseFloat(value) * cambio * 100) / 100 }</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => editItemFunc(id) }
                      >
                        <AiTwotoneEdit />
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => deleteItemFunc(id) }
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                );
                return ligne;
              })
            }
          </tbody>
        </table>
        <button
          type="button"
          className="sort-btn"
          onClick={ () => { this.setState({ rank: true }) } }
        >
          Rank by value (BRL)
        </button>
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
