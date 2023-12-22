import { Button, Modal, Select, Table } from "antd";
import { useState } from "react";
import {
  useGetBussinessProcessQuery,
  useGetTasksQuery
} from "../../../back-office.query";
import { Service } from "../model/service";
import TaskForm from "./task-form";

const TaskTable = () => {
  const [deleteRecord, setDeleteRecord] = useState<Service | null>(null);
  const [editRecord, setEditRecord] = useState<Service | null>(null);
  const [newFormVisible, setNewFormVisible] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  const { data: services, isLoading } = useGetBussinessProcessQuery();
  const { data: tasks, isLoading: taskLoading } = useGetTasksQuery(
    selectedServiceId as any
  );

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

  const handleServiceChange = (value: string) => {
    setSelectedServiceId(value);
    // Additional logic for fetching tasks based on the selected service ID can be added here
  };

  return (
    <>
      <Table
        dataSource={tasks ?? []}
        loading={taskLoading}
        columns={columns}
        rowKey="key"
        title={() => (
          <div className="flex justify-between">
            {
              <Select
                placeholder="Select a Bussiness process"
                style={{ width: 200, marginBottom: 16 }}
                onChange={handleServiceChange}
                loading={isLoading}
              >
                {services?.map((service: any) => (
                  <Select.Option l key={service.id} value={service.id}>
                    {service.name}
                  </Select.Option>
                ))}
              </Select>
            }
            {selectedServiceId?(
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
          <TaskForm mode="new" selectedServiceId={selectedServiceId as any} />
        </Modal>
      )}
    </>
  );
};

export default TaskTable;
