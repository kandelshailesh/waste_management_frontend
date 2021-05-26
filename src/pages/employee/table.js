import React from 'react';
import { Button, Table, Space, Tooltip, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { SkeletonTable } from 'components/TableSkeleton';

export const EmployeeTable = props => {
  console.log('Employee table');

  const { loading } = props;
  const columns = [
    {
      title: 'S.N',
      dataIndex: 'sn',
      key: 'sn',
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Post',
      dataIndex: 'post',
      key: 'post',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      search: true,
      render: text => <span>{text}</span>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: text => <span>{text.toUpperCase()}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => <span>{text.toUpperCase()}</span>,
    },

    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
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
