import { Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Handle, NodeResizer, NodeToolbar, Position } from "reactflow";
import { addHandle } from "../store/handle.slice";
import DotDropDown from "./dot-drop-down";
import ModalContainer from "./modal-container";
import { removeEdge } from "../store/edges.slice";
import { RootState } from "../store/app.store";


const FormBasedNode = ({ data, selected, ...otherProps }:any) => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [returned, setReturned] = useState(false);
  const [openedDrop, setOpenedDrop] = useState(false);
  const edges = useSelector((state: RootState) => state.edges.edges);

  const handleDelete = () => {
    const nodeId = otherProps.id;

    // Remove edges connected to the current node
    const edgesToRemove = edges.filter(
      (edge: { source: any; target: any; }) => edge.source === nodeId || edge.target === nodeId
    );

    edgesToRemove.forEach((edge: { id: any; }) => {
      dispatch(removeEdge(edge.id));
    });
  };

  return (
    <>
      <NodeToolbar position={Position.Right}>
        <Button className='bg-red-700 hover:bg-red-900' onClick={handleDelete}>Delete</Button>
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
          style={{ backgroundImage: `url(../resources/images/circle-plus-green.svg)` }}
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
