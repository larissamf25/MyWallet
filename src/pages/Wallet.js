import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../css/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <hr />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
