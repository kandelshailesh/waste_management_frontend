import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { Drawer, Button, Space, notification, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { STRINGS } from '_constants';
import { TransactionTable } from './table';
import { TransactionForm } from './form';

const Transaction = props => {
  const title = 'Transaction';
  const [visible, setvisible] = useState(false);
  const [submitting, setsubmitting] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState('');
  const [id, setId] = useState('');
  const showDrawer = () => {
    setvisible(true);
  };
  const onClose = () => {
    setvisible(false);
    setId('');
    setData('');
  };
  const fetch = async () => {
    await props.fetchTransactions();
    setLoading(false);
  };

  useEffect(() => {
    if (!visible) fetch();
  }, [visible]);

  return (
    <>
      <Space></Space>
      <TransactionTable loading={loading} userData={props.transactions} />
    </>
  );
};

const mapStoreToProps = ({ Transaction }) => {
  console.log('state', Transaction);
  return {
    transactions: Transaction.payload,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchTransactions: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FETCH_TRANSACTION',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Transaction);
