import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import {
  useLazyGetActiveBpWithServiceIdQuery, useLazyGetTasksQuery
} from "../../../back-office.query";
import { Service } from "../model/service";
import TaskForm from "./task-form";

const TaskTable = ({serviceId}:any) => {
  const [deleteRecord, setDeleteRecord] = useState<Service | null>(null);
  const [editRecord, setEditRecord] = useState<Service | null>(null);
  const [newFormVisible, setNewFormVisible] = useState<boolean>(false);
  const [triggerActiveBP,{ data: activeBP, isLoading,isSuccess }] = useLazyGetActiveBpWithServiceIdQuery();
  useEffect(()=>{
     triggerActiveBP(serviceId)
  },[serviceId, triggerActiveBP])

  console.log("activeBP",activeBP)

  const [triggerTask,{ data: tasks, isLoading: taskLoading }] = useLazyGetTasksQuery( );

  useEffect(()=>{
   if(isSuccess && activeBP?.id )
   {
    triggerTask(activeBP?.id)
   }
  },[activeBP?.id, isSuccess, triggerTask])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Service) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
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
      title: "Confirm Deletion",
      content: `Are you sure you want to delete ${record.name}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        /* onDelete(record); */
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
      <Table
        dataSource={tasks ?? []}
        loading={taskLoading ||isLoading}
        columns={columns}
        rowKey="key"
        title={() => (
          <div className="flex justify-between">
           
            {activeBP?.id?(
              <Button
                type="primary"
                className="bg-primary"
                onClick={handleNewForm}
              >
                New
              </Button>)
            :null}
          </div>
        )}
      />

      {editRecord && (
        <Modal
          title="Edit Task"
          visible={!!editRecord}
          onCancel={() => setEditRecord(null)}
          footer={null}
        >
          <TaskForm mode={"edit"} initialData={editRecord} />
        </Modal>
      )}

      {newFormVisible && (
        <Modal
          title="New Task"
          visible={newFormVisible}
          onCancel={() => setNewFormVisible(false)}
          footer={null}
        >
          <TaskForm mode="new" selectedServiceId={serviceId as any} />
        </Modal>
      )}
    </>
  );
};

export default TaskTable;
