import React from 'react';
import { Button, Table, Space, Tooltip, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import moment from 'moment';
import { SkeletonTable } from 'components/TableSkeleton';

export const TransactionTable = props => {
  console.log('Transaction table');
  const { loading } = props;

  const columns = [
    {
      title: 'S.N',
      dataIndex: 'sn',
      key: 'sn',
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Fullname',
      key: 'fullName',
      render: record => <span>{record?.user?.fullName}</span>,
    },
    {
      title: 'Package Name',
      key: 'package_name',
      render: record => <span>{record?.package?.name || '-'}</span>,
    },
    {
      title: 'Transaction Date',
      key: 'paid_at',
      render: (record, _) => (
        <span>
          {record.createdAt
            ? moment(record.createdAt).format('MMMM Do YYYY, h:mm:ss a')
            : '-'}
        </span>
      ),
    },
    {
      title: 'Transaction Amount',
      key: 'paid_amount',
      dataIndex: 'paid_amount',
      render: record => (
        <span style={{ textAlign: 'center' }}>{`Rs.${record.toFixed(2)}`}</span>
      ),
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
      render: record => <span style={{ textAlign: 'center' }}>ESEWA</span>,
    },
  ];

  if (loading) {
    return <SkeletonTable columns={columns} />;
  }
  return (
    <Table
      pagination={{ position: ' bottomCenter ' }}
      columns={columns}
      dataSource={props.userData}
    ></Table>
  );
};
