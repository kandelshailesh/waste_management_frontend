import React from 'react';
import { Button, Table, Space, Tooltip, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import moment from 'moment';

export const SubscriptionTable = props => {
  console.log('Subscription table');
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
      render: (_, record) => <span>{record?.user?.fullName}</span>,
    },
    {
      title: 'Phone',
      key: 'phone',
      render: (_, record) => <span>{record?.user?.phone}</span>,
    },
    {
      title: 'Package Name',
      key: 'package_name',
      render: (_, record) => <span>{record.package.name || '-'}</span>,
    },
    {
      title: 'Activation Date',
      key: 'activation_date',
      render: (text, record) => (
        <span>
          {record.activation_date
            ? moment(record.activation_date).format('MMMM Do YYYY, h:mm:ss a')
            : '-'}
        </span>
      ),
    },
    {
      title: 'Renewal Date',
      key: 'renewal_date',
      render: (text, record) => (
        <span>
          {record.renewal_date
            ? moment(record.renewal_date).format('MMMM Do YYYY, h:mm:ss a')
            : '-'}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>
          {moment().diff(record.renewal_date) > 0 ? 'Expired' : 'Active'}
        </span>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          {/* <Button
            onClick={() => props.handleEdit(record)}
            className='mr-1 bg-primary'
            size='small'
            style={{ backgroundColor: 'white', border: 0 }}
          >
            <EditFilled style={{ color: 'green' }} />
          </Button> */}
          <Tooltip placement='bottomRight' title='Delete'>
            <Popconfirm
              title='Delete record?'
              onConfirm={() => props.handleDelete(record.id)}
            >
              <Button
                className='mr-1'
                style={{ backgroundColor: 'white', border: 0 }}
                size='small'
              >
                <DeleteFilled style={{ color: 'red' }} />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      pagination={{ position: ' bottomCenter ' }}
      columns={columns}
      dataSource={props.userData}
    ></Table>
  );
};
