import React from 'react';
import { Button, Table, Space, Tooltip, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import moment from 'moment';
import { SkeletonTable } from 'components/TableSkeleton';

export const CollectionRequestTable = props => {
  console.log('Collection Request table');
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
      render: (_, record) => <span>{record.user.fullName}</span>,
    },

    {
      title: 'Phone',
      key: 'phone',
      render: (_, record) => <span>{record.user.phone}</span>,
    },
    {
      title: 'Requested Date',
      dataIndex: 'requested_at',
      key: 'requested_at',
      search: true,
      render: text => (
        <span>{moment(text).format('MMMM Do YYYY, h:mm:ss a')}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => <span>{text.toUpperCase()}</span>,
    },
    {
      title: 'Address',
      key: 'location',
      render: record => (
        <span>
          {record.location}
          &nbsp;
          <a
            target='_blank'
            href={`https://www.google.com/maps/@${record.lat},${record.lng}}`}
          >
            See in Map
          </a>
        </span>
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      render: text => <span>{text?.toUpperCase()}</span>,
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
