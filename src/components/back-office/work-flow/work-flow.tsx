/* eslint-disable react/jsx-no-undef */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StartNode from './components/start-node';
import { RootState } from './store/app.store';

import 'reactflow/dist/style.css';

import ConfirmationNode from './components/confirmation-node';
import EndNode from './components/end-node';
import FormBasedNode from './components/form-based-node';
import PaymentNode from './components/payment-node';
import ReviewNode from './components/review-node';
import { getHandleColor } from './store/handle.slice';

import { useKeyPress } from 'reactflow';


import { removeNode, selectedNode, setNodes } from './store/nodes.slice';

import { addHandle } from './store/handle.slice';

import { addEdge, removeEdge, setEdges, setHovered } from './store/edges.slice';

import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { Button } from 'antd';
import { Notify } from '../../../shared/notification/notify';
import ButtonEdge from './components/button-edge';
import { nodesList } from './components/node';
import NotificationNode from './components/notification-node';
import { ParallelEnd, ParallelStart } from './components/parallel';
import RedirectNode from './components/redirect-node';
import { addNode } from './store/nodes.slice';
import { resetIsValid } from './store/validation.slice';

const connectionLineStyle = { stroke: '#040000' };

const ReactFlowLibrary = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const nodes = useSelector((state: RootState) => state?.nodes?.nodes??nodesList);
  const edges = useSelector((state: RootState) => state?.edges?.edges);
  const [edgeDeleted, setedgeDeleted] = useState('');
  const nodeDeleted = useSelector(
    (state: RootState) => state?.nodes?.selectedNode
  );
  const deletePressed = useKeyPress('Delete');
  const isValid = useSelector((state: RootState) => state?.validation?.isValid);

  const handles:any = useMemo(
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
        (edge: { source: any; target: any; }) =>
          edge.source === nodeDeleted.toString() ||
          edge.target === nodeDeleted.toString()
      );
      edgesToDelete.forEach((edge: { id: any; }) => dispatch(removeEdge(edge.id)));
    }
  }, [deletePressed, nodeDeleted, edgeDeleted, dispatch, edges]);

  const onEdgeUpdate = useCallback(
    (oldEdge: any, newConnection: any) => {
      const edgeUpdateAction = {
        type: 'edges/updateEdge',
        payload: {
          oldEdge: oldEdge,
          newConnection: newConnection,
        },
      };
      dispatch(edgeUpdateAction);
    },
    [dispatch]
  );

  const onNodeClick = useCallback((node: any, event: { id: string; }) => {
    setedgeDeleted('');
    dispatch(selectedNode(event.id));
  }, [dispatch]);

  const onEdgeClick = useCallback((event: any, edge: { id: React.SetStateAction<string>; }) => {
    setedgeDeleted(edge.id);
    dispatch(selectedNode(''));
  }, [dispatch]);

  const onNodesChange = useCallback(
    (changes: any) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(setNodes(updatedNodes));
    },
    [dispatch, nodes]
  );

  const onPaneClick = useCallback(() => {
    dispatch(selectedNode(''));
  }, [dispatch]);

  const onEdgeMouseEnter = () => {
    dispatch(setHovered(true));
  };

  const onEdgeMouseLeave = () => {
    dispatch(setHovered(false));
  };

  const onConnectStart = (event: { target: HTMLElement; }) => {
    dispatch(addHandle((event.target as HTMLElement).dataset['handleid']));
  };

  const onConnect = useCallback(
    (params: { source: any; target: any; }) => {
      const sourceId = params.source;
      const targetId = params.target;

      const targetNode = nodes.find((node: { id: any; }) => node.id === targetId);
      const sourceNode:any = nodes.find((node: { id: any; }) => node.id === sourceId);

      if (isValid) {
        dispatch(
          addEdge({
            id: `${sourceId}-${targetId}`,
            animated: false,
            style: { stroke: `${strokeColor}` },
            type: 'buttonedge',
            label: `${
              handles[sourceNode.type].length > 1 ? handletype.label : ''
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
      notifications.show({
        title: 'Connection Error',
        message: 'You cannot connect those nodes',
        autoClose: 3000,
        withCloseButton: true,
        color: 'red',
        icon: <IconX />,
        styles: (theme: { colors: { [x: string]: any; }; white: any; }) => ({
          root: {
            backgroundColor: theme.colors['white'],
          },
          title: { color: theme.white },
          description: { color: theme.white },

          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.white },
          },
        }),
        style: { backgroundColor: '#194D33' },
      }); 
      Notify("success","successfully added")
     dispatch(resetIsValid(true as any));
    }
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
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

  const checkNodeEdges = (node: { type: any; id: any; }, edges: any[], handles: { [x: string]: any; start?: string[]; formBased?: string[]; review?: string[]; confirmation?: string[]; payment?: string[]; parallel?: string[]; parallelStart?: string[]; parallelEnd?: string[]; notification?: string[]; redirect?: string[]; end?: never[]; }) => {
    const nodeType = node.type;
    const nodeHandles = handles[nodeType];

    // Find all edges where this node is the source
    const sourceEdges = edges.filter((edge: { source: any; }) => edge.source === node.id);

    // Check if the number of source edges is equal to the number of handles for this node's type
    if (sourceEdges.length >= nodeHandles.length) {
      return null;
    } else {
      return node;
    }
  };

  const saveDiagram = () => {
    let allNodesValid = true;

    nodes.forEach((node:any) => {
      const result:any = checkNodeEdges(node, edges, handles);
console.log("result",result)
      if (result !== null) {
        allNodesValid = false;
        Notify(
          'error',
          `Node "${result.data.label}" handles are not fully connected.`
        );
      }

      notifications.show({
        title: 'Default notification',
        message: 'Hey there, your code is awesome! 🤥',
      })
    });

    if (allNodesValid) {
      console.log('Success!');
      console.log({ nodes });
      console.log({ edges });
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
        type: 'parallelStart',
        position: positionStart,
        data: { label: `Parallel ${parallelID} Start ` },
      })
    );

    dispatch(
      addNode({
        id: `Parallel-${parallelID}-End`,
        type: 'parallelEnd',
        position: positionEnd,
        data: { label: `End ${parallelID} ` },
      })
    );
  };

  return (
    <div className="mb-2.5 flex h-4/5 min-h-screen flex-col rounded-sm border-blue-800 p-2">
      <div className="flex self-end">
        {/* <Button
          className="mb-2 mr-2 w-fit bg-orange-600 hover:bg-orange-700"
          onClick={() => addParallelTask()}
        >
          Add Parallel Task
        </Button> */}
        <Button
          className="mb-2 w-fit bg-primary hover:bg-primary-800"
          onClick={() => saveDiagram()}
        >
          Save
        </Button>
      </div>
      <ReactFlowProvider>
        <div
          className="h-screen flex-grow border-2 border-blue-500"
          ref={reactFlowWrapper}
        >
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
          >
            <Background className="bg-white" variant={BackgroundVariant.Dots} />
            <Controls />
          </ReactFlow> 
        
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ReactFlowLibrary;

export const WorkFlow = ReactFlowLibrary
