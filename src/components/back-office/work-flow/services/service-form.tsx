import { Button, Form, Input, Switch } from 'antd';
import React from 'react';
import { useCreateServiceMutation, useUpdateServiceMutation } from '../../../back-office.query';
import { Service } from '../model/service';

interface ServiceFormProps {
  mode:"new"|"edit"
  initialData?: Service;
  editRecord?:any
}

const ServiceForm: React.FC<ServiceFormProps> = ({initialData,editRecord,mode }) => {
    const[createService,{isLoading}]=useCreateServiceMutation()
    const[updateService,{isLoading:updateIsLoading}]=useUpdateServiceMutation()
  const [form] = Form.useForm();

  const onFinish = (values: Service) => {
    form.resetFields();
   mode==='new'? createService(values):updateService({...values,id:editRecord.id})
  };

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
        label="Key"
        name="key"
        rules={[{ required: true, message: 'Please enter the key' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter the description' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Active"
        name="isActive"
        valuePropName="checked"

      >
        <Switch         className= {"bg-gray-200"}
 />
      </Form.Item>
      <Form.Item>
        <Button type="primary" className='bg-primary' loading={mode==='new'?isLoading:updateIsLoading} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ServiceForm;
