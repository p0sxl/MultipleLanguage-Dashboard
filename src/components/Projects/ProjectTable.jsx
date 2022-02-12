import React from 'react'
import {Table} from 'antd';
const ProjectTable = ({source}) => {
    const columns = [
        {
          title: '#',
          dataIndex: 'order',
          key: 'order',
        },
        {
          title: 'Account Id',
          dataIndex: 'AccountId',
          key: 'AccountId',
        },
        {
          title: 'Project Name',
          dataIndex: 'ProjectName',
          key: 'ProjectName',
        },
        {
          title: 'Languages',
          dataIndex: 'Languages',
          key: 'Languages',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
          },
      ];

  return (
    <>
        <Table columns={columns} dataSource={source} />
    </>
  )
}

export default ProjectTable