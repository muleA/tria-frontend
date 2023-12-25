import { Table } from 'antd';
import { useEffect } from 'react';
import { useLazyGetServiceDetailQuery } from '../../../back-office.query';



const ServiceDetails = ( {serviceId}:any) => {

const [trigger,{data:services,isLoading}]=useLazyGetServiceDetailQuery()
useEffect(()=>{
    if(serviceId){
        trigger(serviceId)
    }
},[serviceId])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (isActive ? 'Yes' : 'No'),
    }
  ];
  return (
      <Table   dataSource={Array.isArray(services) ? services : [services]}
      loading={isLoading} columns={columns} rowKey="key"   />
  );
      }
export default ServiceDetails;
