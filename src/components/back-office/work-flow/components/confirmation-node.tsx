import { Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons";
import { memo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Handle,
  NodeResizer,
  NodeToolbar,
  Position,
  useStore,
} from "reactflow";
import { Notify } from "../../../../shared/notification/notify";
import circlePlusRed from "../resources/images/circle-plus-red.svg";
import { RootState } from "../store/app.store";
import { removeEdge } from "../store/edges.slice";
import { addHandle } from "../store/handle.slice";
import { removeNode } from "../store/nodes.slice";
import DotDropDown from "./dot-drop-down";
import ModalContainer from "./modal-container";

const ConfirmationNode = ({ data, selected, ...otherProps }: any) => {
  const dispatch = useDispatch();
  const isValid = useSelector((state: RootState) => state.validation.isValid);
  const [opened, { open, close }] = useDisclosure(false);
  const [returned, setReturned] = useState(false);
  const [openedDrop, setOpenedDrop] = useState(false);
  const [widthTest, setWidthTest] = useState(4);

  const size = useStore((s) => {
    const node = s.nodeInternals?.get(otherProps["id"]);
    return {
      width: node?.width,
      height: node?.height,
    };
  });

  const handleDelete = () => {
    const nodeId = otherProps.id;

    // Remove edges connected to the current node
    const edgesToRemove = edges.filter(
      (edge) => edge.source === nodeId || edge.target === nodeId
    );

    edgesToRemove.forEach((edge) => {
      dispatch(removeEdge(edge.id));
    });
  };


  const handleDeleteNode=()=>{
    const nodeId = otherProps.id;

    // Remove edges connected to the current node
    const nodesToRemove = nodes.filter(
      (node) => node.id === nodeId || node.id === nodeId
    );

    nodesToRemove.forEach((node) => {
      dispatch(removeNode(node.id));
    });
  }

  const labelRef = useRef<HTMLLabelElement>(null);

  const selectedNode = useSelector(
    (state: RootState) => state.nodes.selectedNode
  );

  const nodes = useSelector((state: RootState) => state.nodes.nodes);

  const edges = useSelector((state: RootState) => state.edges.edges);

  const throwError = () => {
    Notify(
      "success",
      "You cannot add more nodes since you already have an edge connected to this handle. Use the button on the edge if you wish to add a task in between."
    );
  };
  const checkExistingEdge = (handle: string | null | undefined, id: string) => {
    return (
      edges.find(
        (edge) => edge.source === id && edge.sourceHandle === handle
      ) !== undefined
    );
  };

  // const widthOutside = nodes.find((node) => node.id === otherProps.id).width;
  // console.log("NO refresh")
  // useEffect(() => {
  //   setWidthTest(widthOutside);
  //   console.log("From useEffect", widthTest)
  // }, [widthOutside]);
  // console.log(`Width from outside: ${widthOutside}`);
  //

  // const widthCalc = () => {
  //   const width = nodes.find((node) => node.id === otherProps.id).width;
  //   console.log('Width from widthCalc', width);
  // };

  const handleResize = (event: any, labelRef: { current: any }) => {
    const labelEl = labelRef.current;
    const labelWidth = labelEl?.offsetWidth || 0;

    // Calculate the maximum number of characters that can fit in the label's width
    // const maxChars = Math.floor(data.label.length * (labelWidth / labelEl.scrollWidth));

    const maxChars = 20;

    // Trim the label to the maximum number of characters
    const label = data.label.substring(0, maxChars);
    labelEl.textContent = label;
  };

  return (
    <>
      <NodeToolbar position={Position.Right}>
      <Button className="bg-red-700 hover:bg-red-900" onClick={handleDelete}>
          
          
          Delete</Button>
      </NodeToolbar>
      <div className="w-[278px]">
        <NodeResizer
          color="#036917"
          isVisible={selected}
          onResize={(event) => {
            // console.log(`Resizing node ${otherProps.id}`);
            // const width = nodes.find((node) => node.id === otherProps.id).width;
            // console.log({ data });
            //console.log(`Width from within: ${width}`)
            // handleResize(event, labelRef);
          }}
          handleStyle={{ width: "8px", height: "8px" }}
          lineStyle={{ borderWidth: "1.3px" }}
          minWidth={100}
          minHeight={37}
        />
      </div>
      <Tooltip
        id={`confirmation-info-tooltip-${otherProps["id"]}`}
        label={data.label}
      >
        <div
          className={`flex h-full cursor-grab justify-center overflow-hidden rounded-sm border-2 border-blue-700 bg-white p-2 hover:border-green-700`}
          data-tooltip-id={`confirmation-info-tooltip-${otherProps["id"]}`}
          data-tooltip-content={data.label}
        >
          <Handle type="target" position={Position.Top} id="in" />
          <Tooltip
            label="Yes"
            id={`confirmation-yes-tooltip-${otherProps["id"]}`}
          >
            <Handle
              className="-mr-1 w-4 h-4 bg-transparent border-none bg-contain cursor-pointer z-100"
              type="source"
              style={{
                backgroundImage: `url(../resources/images/circle-plus-green.svg)`,
              }}
              position={Position.Bottom}
              id="Yes"
              onClick={(event) => {
                dispatch(addHandle("Yes"));
                const existingEdge = checkExistingEdge(
                  "Yes",
                  selectedNode
                );
                if (!existingEdge) open();
                else {
                  throwError();
                }
              }}
            ></Handle>
          </Tooltip>
          <Tooltip
            id={`confirmation-no-tooltip-${otherProps["id"]}`}
            label="No"
          >
            <Handle
              className="-mr-1 w-4 h-4 bg-transparent bg-contain border-none cursor-pointer z-100"
              style={{ backgroundImage: `url(${circlePlusRed})` }}
              type="source"
              position={Position.Right}
              data-tooltip-id={`confirmation-no-tooltip-${otherProps["id"]}`}
              data-tooltip-content="No"
              id="No"
              onClick={(event) => {
                dispatch(addHandle("No"));
                open();
              }}
            ></Handle>
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
            className="absolute right-1 cursor-pointer"
            size={15}
            strokeWidth={2}
            color={"#000000"}
          />
          <label ref={labelRef}>{data.label}</label>
          <DotDropDown opened={openedDrop} handleDelete={handleDeleteNode} setOpened={setOpenedDrop} />
        </div>
      </Tooltip>
    </>
  );
};
export default memo(ConfirmationNode);


