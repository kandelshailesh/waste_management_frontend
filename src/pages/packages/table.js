import React from 'react';
import { Button, Table, Space, Tooltip, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

export const PackageTable = props => {
  console.log('Employee table');
  const columns = [
    {
      title: 'S.N',
      dataIndex: 'sn',
      key: 'sn',
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Package Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },

    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      search: true,
      render: text => <span>{text}</span>,
    },

    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      // render: (text) => <span>{text === null ? '-' : text}</span>,
    },
    {
      title: 'unit',
      dataIndex: 'unit',
      key: 'unit',
      render: text => <span>{text.toUpperCase()}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => <span>{text.toUpperCase()}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            onClick={() => props.handleEdit(record)}
            className='mr-1 bg-primary'
            size='small'
            style={{ backgroundColor: 'white', border: 0 }}
          >
            <EditFilled style={{ color: 'green' }} />
          </Button>
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