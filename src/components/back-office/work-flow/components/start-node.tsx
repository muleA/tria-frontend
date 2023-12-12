import { Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCirclePlus } from '@tabler/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Handle, Position } from 'reactflow';
import { addHandle } from '../store/handle.slice';
import ModalContainer from './modal-container';



const StartNode = ({...otherProps}) => {
  const dispatch = useDispatch()

  const [opened, { open, close }] = useDisclosure(false);
  const [returned, setReturned] = useState(false)

  return (
    <div className="flex justify-center items-center ring-2 ring-green-500 w-12 h-12 bg-white rounded-full text-green-700">
      <Handle type="source" position={Position.Bottom} id="default" onClick={(event) => {dispatch(addHandle(""))}}/>
      <Tooltip
        label="Add New Task">
      <Handle className='w-4 h-4 bg-transparent border-none cursor-pointer z-100' type="source" position={Position.Bottom} id="default" 
          onClick={(event) => {
            open()
            }}>
            <IconCirclePlus
                  size={18}
                  strokeWidth={2.5}
                  color={'#ffffff'}
                  className= "inline-block absolute fill-green-700 color-white z-0 mr-10 cursor-pointer"
                  onClick={() => dispatch(addHandle("default"))}
              />
            </Handle>
            </Tooltip>
            <ModalContainer opened={opened} onClose={close} returned={returned} fromEdge={false} edgeId={""} otherProps={otherProps}/>
        Start
    </div>
  );
}

export default StartNode;