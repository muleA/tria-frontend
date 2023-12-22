/* eslint-disable react/jsx-no-undef */
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  useKeyPress
} from "reactflow";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import StartNode from "./components/start-node";
import { RootState } from "./store/app.store";

import "reactflow/dist/style.css";

import ConfirmationNode from "./components/confirmation-node";
import EndNode from "./components/end-node";
import FormBasedNode from "./components/form-based-node";
import PaymentNode from "./components/payment-node";
import ReviewNode from "./components/review-node";
import { addHandle, getHandleColor } from "./store/handle.slice";

import { removeNode, selectedNode, setNodes } from "./store/nodes.slice";

import { addEdge, removeEdge, setEdges, setHovered } from "./store/edges.slice";

import { Loader } from "@mantine/core";
import { Button, Select } from "antd";
import { convertReactFlowToXState } from "../../../models/convert-to-xstate";
import { Notify } from "../../../shared/notification/notify";
import {
  useGetServicesQuery,
  useLazyGetSavedWorkFlowQuery,
  useSaveWorkFlowMutation,
} from "../../back-office.query";
import ButtonEdge from "./components/button-edge";
import NotificationNode from "./components/notification-node";
import { ParallelEnd, ParallelStart } from "./components/parallel";
import RedirectNode from "./components/redirect-node";
import { addNode } from "./store/nodes.slice";
import { resetIsValid } from "./store/validation.slice";
const connectionLineStyle = { stroke: "#040000" };

const ReactFlowLibrary = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [saveWorkFlow, { isLoading }] = useSaveWorkFlowMutation();
  const nodes = useSelector((state: RootState) => state?.nodes?.nodes);
  const edges = useSelector((state: RootState) => state?.edges?.edges);
  const [edgeDeleted, setedgeDeleted] = useState("");
  const nodeDeleted = useSelector(
    (state: RootState) => state?.nodes?.selectedNode
  );
  const deletePressed = useKeyPress("Delete");
  const isValid = useSelector((state: RootState) => state?.validation?.isValid);

  const handles: any = useMemo(
    () => ({
      start: ['default'],
      formBased: ['Yes'],
      review: ['ReviewApprove', 'ReviewReject', 'ReviewAdjust'],
      confirmation: ['ConfirmationYes', 'ConfirmationNo'],
      payment: ['ElectronicPayment', 'CashPayment'],
      parallel: ['Yes'],
      parallelStart: ['Yes'],
      parallelEnd: ['Yes'],
      notification: ['Yes'],
      redirect: ['Yes'],
      end: [],
    }),
    []
  );

  const dispatch = useDispatch();

  const onEdgesChange = useCallback(
    (changes: any) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      dispatch(setEdges(updatedEdges));
    },
    [dispatch, edges]
  );

  const handletype = useSelector((state: RootState) => state.handle);

  const strokeColor = getHandleColor(handletype);

  useEffect(() => {
    if (deletePressed && edgeDeleted) {
      dispatch(removeEdge(edgeDeleted));
    } else if (deletePressed && nodeDeleted) {
      dispatch(removeNode(nodeDeleted));
      const edgesToDelete = edges.filter(
        (edge: { source: any; target: any }) =>
          edge.source === nodeDeleted.toString() ||
          edge.target === nodeDeleted.toString()
      );
      edgesToDelete.forEach((edge: { id: any }) =>
        dispatch(removeEdge(edge.id))
      );
    }
  }, [deletePressed, nodeDeleted, edgeDeleted, dispatch, edges]);

  const onEdgeUpdate = useCallback(
    (oldEdge: any, newConnection: any) => {
      const edgeUpdateAction = {
        type: "edges/updateEdge",
        payload: {
          oldEdge: oldEdge,
          newConnection: newConnection,
        },
      };
      dispatch(edgeUpdateAction);
    },
    [dispatch]
  );

  const onNodeClick = useCallback(
    (node: any, event: { id: string }) => {
      setedgeDeleted("");
      dispatch(selectedNode(event.id));
    },
    [dispatch]
  );

  const onEdgeClick = useCallback(
    (event: any, edge: { id: React.SetStateAction<string> }) => {
      setedgeDeleted(edge.id);
      dispatch(selectedNode(""));
    },
    [dispatch]
  );

  const onNodesChange = useCallback(
    (changes: any) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(setNodes(updatedNodes));
    },
    [dispatch, nodes]
  );

  const onPaneClick = useCallback(() => {
    dispatch(selectedNode(""));
  }, [dispatch]);

  const onEdgeMouseEnter = () => {
    dispatch(setHovered(true));
  };

  const onEdgeMouseLeave = () => {
    dispatch(setHovered(false));
  };


  const onConnectStart = (event: { target: HTMLElement }) => {
    dispatch(addHandle((event.target as HTMLElement).dataset["handleid"]));
  };

  const onConnect = useCallback(
    (params: { source: any; target: any }) => {
      const sourceId = params.source;
      const targetId = params.target;

      const targetNode = nodes.find(
        (node: { id: any }) => node.id === targetId
      );
      const sourceNode: any = nodes.find(
        (node: { id: any }) => node.id === sourceId
      );

      if (isValid) {
        dispatch(
          addEdge({
            id: `${sourceId}-${targetId}`,
            animated: false,
            style: { stroke: `${strokeColor}` },
            type: "buttonedge",
            label: `${
              handles[sourceNode.type]?.length > 1 ? handletype.label : ""
            }`,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: strokeColor,
            },
            ...params,
          })
        );
      }
    },
    [strokeColor, handletype?.label, nodes, isValid, handles, dispatch]
  );

  const onConnectEnd = () => {
    if (!isValid) {
      Notify("success", "successfully added");
      dispatch(resetIsValid(true as any));
    }
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const nodeTypes = useMemo(
    () => ({
      start: StartNode,
      end: EndNode,
      review: ReviewNode,
      confirmation: ConfirmationNode,
      formBased: FormBasedNode,
      payment: PaymentNode,
      redirect: RedirectNode,
      notification: NotificationNode,
      parallelStart: ParallelStart,
      parallelEnd: ParallelEnd,
    }),
    []
  );

  const edgeTypes = useMemo(() => ({ buttonedge: ButtonEdge }), []);

  const checkNodeEdges = (
    node: { type: any; id: any },
    edges: any[],
    handles: {
      [x: string]: any;
      start?: string[];
      formBased?: string[];
      review?: string[];
      confirmation?: string[];
      payment?: string[];
      parallel?: string[];
      parallelStart?: string[];
      parallelEnd?: string[];
      notification?: string[];
      redirect?: string[];
      end?: never[];
    }
  ) => {
    const nodeType = node.type;
    const nodeHandles = handles[nodeType];

    // Find all edges where this node is the source
    const sourceEdges:any[] = edges.filter(
      (edge: { source: any }) => edge.source === node.id
    );

    // Check if the number of source edges is equal to the number of handles for this node's type
    if (sourceEdges?.length >= nodeHandles?.length) {
      return null;
    } else {
      return node;
    }
  };
  const [rfInstance, setRfInstance] = useState<any>(null);

  const saveDiagram = () => {
    let allNodesValid = true;
    if (rfInstance) {
      const flow = rfInstance?.toObject();
      saveWorkFlow({
        reactflow: JSON.stringify(flow),
        workflow:convertReactFlowToXState(flow),
        serviceId: selectedServiceId,
        isActive: true,
        organizationId: false,
      });
       
    }

    nodes.forEach((node: any) => {
      const result: any = checkNodeEdges(node, edges, handles);
      if (result !== null) {
        allNodesValid = false;
        Notify(
          "error",
          `Node "${result.data.label}" handles are not fully connected.`
        );
      }
      Notify("success", "successfully added");
    });

    if (allNodesValid) {
      console.log("Success!");
    }
  };

  let parallelID = 0;
  const addParallelTask = () => {
    const lastNode = nodes[nodes.length - 1];

    const positionStart = {
      x: 161,
      y: lastNode.position.y + 120,
    };

    const positionEnd = {
      x: 161,
      y: lastNode.position.y + 300,
    };

    parallelID++;
    dispatch(
      addNode({
        id: `Parallel-${parallelID}-Start`,
        type: "parallelStart",
        position: positionStart,
        data: { label: `Parallel ${parallelID} Start ` },
      })
    );

    dispatch(
      addNode({
        id: `Parallel-${parallelID}-End`,
        type: "parallelEnd",
        position: positionEnd,
        data: { label: `End ${parallelID} ` },
      })
    );
  };
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  const { data: services, isLoading: serviceLoading } = useGetServicesQuery();
  const [
    triggerSavedWorkFlowDesign,
    { data: savedDesign, isSuccess, isLoading: designLoading },
  ] = useLazyGetSavedWorkFlowQuery();

 
  useEffect(() => {
    if (selectedServiceId) {
      triggerSavedWorkFlowDesign(selectedServiceId);
    }
  }, [selectedServiceId, triggerSavedWorkFlowDesign]);
  useEffect(() => {
    if (isSuccess) {
      if (savedDesign?.reactflow) {
        try {
          const savedFlow = JSON.parse(savedDesign.reactflow);
  
          // Update nodes and edges based on the saved flow
          dispatch(setNodes(savedFlow?.nodes));
          dispatch(setEdges(savedFlow?.edges));
        } catch (error) {
          console.error("Error parsing JSON:", error);
          // Handle the error as needed, such as showing a user-friendly message
        }
      } else {
        // Handle the case where reactflow data is not present
        console.warn("No reactflow data available in savedDesign.");
      }
    }
  }, [isSuccess, savedDesign?.reactflow, dispatch]);
  


  const handleServiceChange = (value: string) => {
    setSelectedServiceId(value);
    // Additional logic for fetching tasks based on the selected service ID can be added here
  };
  return (
    <div className="mb-2.5 flex h-4/5 min-h-screen flex-col rounded-sm border-blue-800 p-2">
      <div className="flex justify-between">
        {/* <Button
          className="mb-2 mr-2 w-fit bg-orange-600 hover:bg-orange-700"
          onClick={() => addParallelTask()}
        >
          Add Parallel Task
        </Button> */}

        <Select
          placeholder="Select a service"
          style={{ width: 200, marginBottom: 16 }}
          onChange={handleServiceChange}
          loading={serviceLoading}
        >
          {services?.map((service: any) => (
            <Select.Option l key={service.id} value={service.id}>
              {service.name}
            </Select.Option>
          ))}
        </Select>
        <Button
          className="mb-2 w-fit bg-primary hover:bg-primary-800"
          onClick={() => saveDiagram()}
          loading={isLoading}
        >
          Save
        </Button>
      </div>
      <ReactFlowProvider>
        <div
          className="h-screen flex-grow border-2 border-blue-500"
          ref={reactFlowWrapper}
        >
          {designLoading ? (
                <div className="flex items-center  mx-auto text-center mt-20 justify-center h-24">

            <Loader  className="h-24" />
            </div>
          ) : (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onConnect={onConnect}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onDragOver={onDragOver}
              onEdgeUpdate={onEdgeUpdate}
              onNodeClick={onNodeClick}
              onEdgeClick={onEdgeClick}
              nodeTypes={nodeTypes}
              connectionLineStyle={connectionLineStyle}
              connectionRadius={30}
              onConnectEnd={onConnectEnd}
              edgeTypes={edgeTypes}
              onPaneClick={onPaneClick}
              onEdgeMouseEnter={onEdgeMouseEnter}
              onEdgeMouseLeave={onEdgeMouseLeave}
              onConnectStart={onConnectStart as any}
              elevateEdgesOnSelect={true}
              snapToGrid={true}
              snapGrid={[5, 5]}
              fitView
              onInit={setRfInstance as any}
            >
              <Background
                className="bg-white"
                variant={BackgroundVariant.Dots}
                size={2}
              />
              <Controls />
            </ReactFlow>
          )}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ReactFlowLibrary;

export const WorkFlow = ReactFlowLibrary;
