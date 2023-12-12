import { Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, NodeToolbar, Position } from "reactflow";
import { addHandle } from "../store/handle.slice";
import DotDropDown from "./dot-drop-down";
import ModalContainer from "./modal-container";


const PaymentNode = ({ data, selected, ...otherProps }:any) => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [returned, setReturned] = useState(false);
  const [openedDrop, setOpenedDrop] = useState(false);

  return (
    <>
       <NodeToolbar position={Position.Right}>
        <Button className='bg-red-700 hover:bg-red-900'>Delete</Button>
      </NodeToolbar> 
      <Tooltip
        id={`payment-info-tooltip-${otherProps["id"]}`}
        label={data.label}>     
      
      <div
        className={`p-2 h-full overflow-hidden cursor-grab flex justify-center rounded-sm bg-white border-blue-700 border-2 hover:border-green-700`}
        data-tooltip-id={`payment-info-tooltip-${otherProps["id"]}`}
        data-tooltip-content={data.label}
      >
        <Handle type="target" position={Position.Top} id="in" />
        <Tooltip
          id={`Electronic-tooltip-${otherProps["id"]}`}
          label="Electronic Payment">
        <Handle
          className="-ml-16 w-4 h-4 bg-transparent border-none bg-contain cursor-pointer z-100"
          style={{ backgroundImage: `url("../resources/images/circle-plus-green.svg")`}}
          type="source"
          position={Position.Bottom}
          id="ElectronicPayment"
          onClick={(event) => {
            open();
          }}
        >
        </Handle>
        </Tooltip>
        <Tooltip
          id={`Cash-tooltip-${otherProps["id"]}`}
          label="Cash Payment">
        
        <Handle
          className="ml-16 w-4 h-4 bg-transparent border-none cursor-pointer bg-contain bg-no-repeat z-100"
          style={{ backgroundImage: `url(../resources/images/circle-plus-red.svg)` }}
       


type="source"
          position={Position.Bottom}
          id="CashPayment"
          onClick={(event) => {
            dispatch(addHandle("CashPayment"))
            open();
          }}
        >
        </Handle>
        </Tooltip>

        <ModalContainer
          opened={opened}
          onClose={close}
          returned={returned}
          fromEdge={false}
          edgeId={""}
          otherProps={otherProps}
        />
        <IconDotsVertical
          onClick={() => setOpenedDrop(!openedDrop)}
          className="absolute right-2 cursor-pointer"
          size={15}
          strokeWidth={2}
          color={"#000000"}
        />
        <label>{data.label}</label>
        <DotDropDown opened={openedDrop} setOpened={setOpenedDrop} />
      </div>
      </Tooltip>
    </>
  );
};

export default PaymentNode;
