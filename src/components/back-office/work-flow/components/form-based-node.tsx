import { Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, NodeResizer, NodeToolbar, Position } from "reactflow";
import { addHandle } from "../store/handle.slice";
import DotDropDown from "./dot-drop-down";
import ModalContainer from "./modal-container";


const FormBasedNode = ({ data, selected, ...otherProps }:any) => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [returned, setReturned] = useState(false);
  const [openedDrop, setOpenedDrop] = useState(false);

  return (
    <>
      <NodeToolbar position={Position.Right}>
        <Button className='bg-red-700 hover:bg-red-900'>Delete</Button>
      </NodeToolbar> 
      <div className="w-[278px]" >
        <NodeResizer color="#036917" isVisible={selected} handleStyle={{ width: "8px", height: "8px" }} lineStyle={{borderWidth: "1.3px"}} minWidth={100} minHeight={40} />
      </div>
      <Tooltip
        id={`request-info-tooltip-${otherProps["id"]}`}
        label={data.label}
        >
      <div
        className={`p-2 h-full overflow-hidden cursor-grab flex justify-center rounded-sm bg-white border-blue-700 border-2 hover:border-green-700`}
        data-tooltip-id={`request-info-tooltip-${otherProps["id"]}`}
        data-tooltip-content={data.label}
      >
        <Handle type="target" position={Position.Top} id="in" />        
        <Handle
          className="w-4 h-4 rounded-full bg-transparent border-none bg-contain cursor-pointer"
          type="source"
          style={{ backgroundImage: `url("../resources/images/circle-plus-green.svg")` }}
          position={Position.Bottom}
          id="Yes"
          onClick={(event) => {
            dispatch(addHandle("Yes"))
            open();
          }}
        >
        </Handle>
        <Handle type="target" position={Position.Left} id="Returned-left" />
        <Handle type="target" position={Position.Right} id="Returned-right" />
        <IconDotsVertical
          onClick={() => setOpenedDrop(!openedDrop)}
          className="absolute right-1 cursor-pointer"
          size={15}
          strokeWidth={2}
          color={"#000000"}
        />
        <label>{data.label}</label>
        <DotDropDown opened={openedDrop} setOpened={setOpenedDrop} />
        <ModalContainer
          opened={opened}
          onClose={close}
          returned={returned}
          fromEdge={false}
          edgeId={""}
          otherProps={otherProps}
        />
      </div>
      </Tooltip>
  
    </>
  );
};

export default FormBasedNode;
