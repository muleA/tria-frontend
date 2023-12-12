import { Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, NodeResizer, NodeToolbar, Position } from "reactflow";
import { addHandle } from "../store/handle.slice";
import DotDropDown from "./dot-drop-down";
import ModalContainer from "./modal-container";


const ReviewNode = ({ data, selected, ...otherProps }:any) => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [returned, setReturned] = useState(false);
  const [openedDrop, setOpenedDrop] = useState(false);

  return (
    <>
       <NodeToolbar position={Position.Right}>
        <Button className='bg-red-700 hover:bg-red-900'>Delete</Button>
      </NodeToolbar> 
      <div className="w-[278px]">
        <NodeResizer
          color="#036917"
          isVisible={selected}
          handleStyle={{ width: "8px", height: "8px" }}
          lineStyle={{ borderWidth: "1.3px" }}
          minWidth={100}
          minHeight={37}
        />
      </div>
      <Tooltip
        id={`review-info-tooltip-${otherProps["id"]}`}
        label={data.label}>
      
      <div
        className={`p-2 h-full overflow-hidden cursor-grab rounded-sm bg-white border-blue-700 border-2 hover:border-green-700  }`}
        data-tooltip-id={`review-info-tooltip-${otherProps["id"]}`}
        data-tooltip-content={data.label}
      >
        <Handle type="target" position={Position.Top} id="in" />
        <Tooltip
          id={`Adjust-tooltip-${otherProps["id"]}`}
          label="Review Adjust">
        
        <Handle
          className="-ml-1 w-4 h-4 bg-transparent border-none cursor-pointer bg-contain z-100"

style={{ backgroundImage: `url("../resources/images/circle-plus-yellow.svg")`}}

type="source"
          position={Position.Left}
          id="ReviewAdjust"
          onClick={(event) => {
            setReturned(true);
            dispatch(addHandle("ReviewAdjust"));
            open();
          }}
        >
      
        </Handle>
        </Tooltip>

        <Tooltip
          id={`Reject-tooltip-${otherProps["id"]}`}
          label="Review Reject">

        
        <Handle
          className="-mr-1 w-4 h-4 bg-transparent border-none cursor-pointer bg-contain z-100"
          type="source"
/*           style={{ backgroundImage: `url(${redCirclePlus.src as any})` }}
 */          position={Position.Right}
          id="ReviewReject"
          onClick={(event) => {
            setReturned(false);
            dispatch(addHandle("ReviewReject"));
            open();
          }}
          data-tooltip-id={`Reject-tooltip-${otherProps["id"]}`}
          data-tooltip-content="Review Reject"
        >
        </Handle>
        </Tooltip>

        <Tooltip
          id={`Approve-tooltip-${otherProps["id"]}`}
          label="Review Approve">

        
        <Handle
          className="-mr-1 w-4 h-4 bg-transparent border-none cursor-pointer bg-contain z-100"
/*           style={{ backgroundImage: `url(${greenCirclePlus.src as any})` }}
 */          type="source"
          position={Position.Bottom}
          id="ReviewApprove"
          onClick={(event) => {
            setReturned(false);
            dispatch(addHandle("ReviewApprove"));
            open();
          }}
        >
        </Handle>
        </Tooltip>
        <IconDotsVertical
          onClick={() => setOpenedDrop(!openedDrop)}
          className="absolute right-1 cursor-pointer"
          size={15}
          strokeWidth={2}
          color={"#000000"}
        />
        <label className="self-center">{data.label}</label>
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

export default ReviewNode;
