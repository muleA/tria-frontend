import { IconListCheck, IconListDetails, IconRepeat } from '@tabler/icons';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import ReactFlowLibrary from '../work-flow';
import ServiceDetails from './service-detail';
import TaskTable from './task-list';
import { useParams } from 'react-router';

const { TabPane } = Tabs;

const ServiceDetailWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('1');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  const params=useParams()
  console.log("params",params)

  return (
    <Tabs
      activeKey={activeTab}
      onChange={handleTabChange}
      className=" p-2 rounded-lg"
      tabBarStyle={{ background: '#f0f2f5' }}
    >
      <TabPane
        tab={
          <div className="flex items-center">
            <IconListDetails size={20} />
            <span className="ml-2">Service Details</span>
          </div>
        }
        key="1"
      >
        <ServiceDetails  serviceId={params.id}/>
      </TabPane>
      <TabPane
        tab={
          <div className="flex items-center">
            <IconListCheck size={20} />
            <span className="ml-2">Tasks</span>
          </div>
        }
        key="2"
      >
        <TaskTable serviceId={params.id} />
      </TabPane>
      <TabPane
        tab={
          <div className="flex items-center">
            <IconRepeat size={20} />
            <span className="ml-2">Workflow</span>
          </div>
        }
        key="3"
      >
        <ReactFlowLibrary serviceId={params.id} />
      </TabPane>
    </Tabs>
  );
};

export default ServiceDetailWrapper;
