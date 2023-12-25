import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { Notify } from '../../../../shared/notification/notify';
import { useCreateTaskMutation } from '../../../back-office.query';
import { Service } from '../model/service';

interface TaskFormProps {
  mode:"new"|"edit"
  initialData?: Service;
  selectedServiceId?:string
}

const TaskForm: React.FC<TaskFormProps> = ({initialData,selectedServiceId }) => {
    const[createService,{isLoading}]=useCreateTaskMutation()
  const [form] = Form.useForm();

  const onFinish = (values: Service) => {
    form.resetFields();
    createService({...values,bpId:selectedServiceId})
    Notify("success","sucess")
  };

  const workflowSteps: { value: string; label: string }[] = [
    { value: 'Requester', label: 'Requester' },
    { value: 'Assignee', label: 'Assignee' }
  ];

  const taskType: { value: string; label: string }[] = [
    { value: 'confirmation', label: 'Confirmation' },
    { value: 'approval', label: 'Approval' },
    { value: 'certificate', label: 'Certificate' },
    {value:"notification",label:"Notification"},
    {value:"review",label:"Review"},
    {value:"redirect",label:"Redirect"},
    {value:"formBased",label:"FormBased"},
    { value: 'end', label: 'End' },
  ];


  const { Option } = Select;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialData}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Label"
        name="label"
        rules={[{ required: true, message: 'Please enter the label' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description' }]}>
              <Input.TextArea rows={2} className="w-full" />
            </Form.Item>
     
            <div className="mb-4">
            <Form.Item label="Task Handler Type" name="taskHandlerType" rules={[{ required: true, message: 'Please enter a task handler type' }]}>
              <Select className="w-full">
                {workflowSteps.map((step) => (
                  <Option key={step.value} value={step.value}>
                    {step.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="mb-4">
            <Form.Item label="Task  Type" name="taskType" rules={[{ required: true, message: 'Please enter a task  type' }]}>
              <Select className="w-full">
                {taskType?.map((step) => (
                  <Option key={step.value} value={step.value}>
                    {step.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
   
      <Form.Item>
        <Button type="primary" className='bg-primary' loading={isLoading} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
