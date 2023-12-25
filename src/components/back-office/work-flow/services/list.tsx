import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDeleteServiceMutation, useGetServicesQuery } from '../../../back-office.query';
import { Service } from '../model/service';
import ServiceForm from './service-form';



const ServiceTable = () => {
  const [deleteRecord, setDeleteRecord] = useState<Service | null>(null);
  const [editRecord, setEditRecord] = useState<Service | null>(null);
  const [newFormVisible, setNewFormVisible] = useState<boolean>(false);
const [deleteService,{isLoading:deleteLoading}]=useDeleteServiceMutation()
const {data:services,isLoading}=useGetServicesQuery()
const navigate=useNavigate()

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
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Service) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
          <Button type="link" onClick={() => navigate(`/services/detail/${record.id}`)}>
Detail          </Button>
        </span>
      ),
    },

  ];


  const handleNewForm = () => {
    setNewFormVisible(true);
  };

  const handleDelete = (record: Service) => {
    setDeleteRecord(record);
    Modal.confirm({
      title: 'Confirm Deletion',
      content: `Are you sure you want to delete ${record.name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
       deleteService(record.id);
         setDeleteRecord(null);
      },
      onCancel: () => {
        setDeleteRecord(null);
      },
    });
  };

  const handleEdit = (record: Service) => {
    setEditRecord(record);
  };

 


  return (
    <>
      <Table dataSource={services??[]} loading={isLoading} columns={columns} rowKey="key"   title={() => (
          <Button type="primary" className='bg-primary' onClick={handleNewForm}>
            New
          </Button>
        )} />

      {editRecord && (
        <Modal
          title="Edit Service"
          visible={!!editRecord}
          onCancel={() => setEditRecord(null)}
          footer={null}
        >
          <ServiceForm  mode={"edit"} initialData={editRecord} editRecord={editRecord} />
        </Modal>
      )}

{newFormVisible && (
        <Modal
          title="New Service"
          visible={newFormVisible}
          onCancel={() => setNewFormVisible(false)}
          footer={null}
        >
          <ServiceForm mode="new" />
        </Modal>
      )}
    </>
  );
      }
export default ServiceTable;
