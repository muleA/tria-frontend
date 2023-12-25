import { Button, Menu } from '@mantine/core';
import { IconTrash, IconX } from "@tabler/icons";

const DotDropDown = ({ opened, setOpened, nodeId ,handleDelete}: any) => {
  return (
    <Menu shadow="md" position="right" width={200} opened={opened} onChange={() => setOpened(!opened)}>
      <Menu.Dropdown className="mt-5 ml-10">
        <Menu.Label>
          <div className="flex items-center justify-between">
            Node Info 
            <Button className="bg-red-700 float-right text-xs h-[30px] hover:bg-red-800" onClick={() => setOpened(false)}>
              <IconX/> Close
            </Button>
          </div>
        </Menu.Label>
      


        <Menu.Item>
          <div className="flex" onClick={handleDelete}>
            <IconTrash size={20} strokeWidth={2} color={'#bf4140'}/>
            <span className="ml-2">Delete Node</span>
          </div>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default DotDropDown;
