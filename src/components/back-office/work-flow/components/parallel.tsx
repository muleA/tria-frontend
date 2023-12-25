import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, NodeResizer, Position } from "reactflow";
import { addHandle } from "../store/handle.slice";
import DotDropDown from "./dot-drop-down";
import ModalContainer from "./modal-container";


export const ParallelStart = ({ data, selected, ...otherProps }:any) => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [returned, setReturned] = useState(false);
  const [openedDrop, setOpenedDrop] = useState(false);

  return (
    <>
      <div className="w-[126px]">
        <NodeResizer
          color="#036917"
          isVisible={selected}
          handleStyle={{ width: "8px", height: "8px" }}
          lineStyle={{ borderWidth: "1.3px" }}
          minWidth={100}
          minHeight={40}
        />
      </div>
      <div
        className={`p-2 h-full overflow-hidden cursor-grab flex justify-center rounded-sm bg-orange-600 border-2 hover:border-green-700 border-blue-700 text-white`}
      >
        <Handle type="target" position={Position.Top} id="in" />
        <Handle
          className="w-4 h-4 rounded-full bg-transparent border-none bg-contain cursor-pointer"
          type="source"
          style={{ backgroundImage: `url("../resources/images/circle-plus-green.svg")` }}
          position={Position.Bottom}
          id="Yes"
          onClick={(event) => {
            dispatch(addHandle("Yes"));
            open();
          }}
        ></Handle>
        <IconDotsVertical
          onClick={() => setOpenedDrop(!openedDrop)}
          className="absolute right-1 cursor-pointer"
          size={15}
          strokeWidth={2}
          color={"#ffffff"}
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
    </>
  );
};

export const ParallelEnd = ({ data, selected, ...otherProps }:any) => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [returned, setReturned] = useState(false);
  const [openedDrop, setOpenedDrop] = useState(false);

  return (
      <div
        className={`p-2 cursor-grab flex justify-center items-center rounded-sm bg-orange-600 border-2 hover:border-green-700 text-white`}
        style={{
          width: "80px",
          height: "80px",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      >
        <Handle
          className="mt-1"
          type="target"
          position={Position.Top}
          id="in"
        />
        <Handle
          className="w-4 h-4 rounded-full bg-transparent border-none bg-contain cursor-pointer mb-2"
          type="source"
          style={{ background: `url("../resources/images/circle-plus-green.svg")` }}
          position={Position.Bottom}
          id="Yes"
          onClick={(event) => {
            dispatch(addHandle("Yes"));
            open();
          }}
        ></Handle>
        <IconDotsVertical
          onClick={() => setOpenedDrop(!openedDrop)}
          className="absolute right-1 cursor-pointer"
          size={15}
          strokeWidth={2}
          color={"#fefefe"}
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
  );
};
