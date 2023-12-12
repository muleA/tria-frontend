import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node as ReactFlowNode } from "reactflow";

interface NodesState {
  nodes: ReactFlowNode[];
  selectedNode: string;
}

const initialState: NodesState = {
  nodes: [
    {
      id: "1",
      type: "start",
      data: { label: "Start", type: "" },
      position: { x: 200, y: 150 },
    },
    {
      id: "2",
      type: "end",
      data: { label: "End", type: "" },
      position: { x: 756.7932572510128, y: 1115.0229916856513 },
    },
  ],
  selectedNode: "",
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<ReactFlowNode[]>) => {
      state.nodes = action.payload;
    },
    addNode: (state, action: PayloadAction<ReactFlowNode>) => {
      const nodeToAdd = action.payload;
      const existingNode = state.nodes.find((node) => node.id === nodeToAdd.id);
      if (!existingNode) {
        state.nodes.push(nodeToAdd);
      }
    },
    updatePosition: (
      state,
      action: PayloadAction<{ addedNode: string; y: number }>
    ) => {
      const { addedNode, y } = action.payload;
      const updatedNodes = state.nodes.map((node) => {
        if (
          node.position.y >= y &&
          node.id !== addedNode.toString() &&
          node.type !== "start" &&
          node.type !== "end"
        ) {
          return {
            ...node,
            position: {
              x: node.position.x,
              y: node.position.y + 120,
            },
          };
        } else {
          return node;
        }
      });
      state.nodes = updatedNodes;
    },
    removeNode: (state, action: PayloadAction<string>) => {
      const nodeIdToRemove = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeIdToRemove);
    },
    selectedNode: (state, action: PayloadAction<string>) => {
      state.selectedNode = action.payload;
    },
  },
});

export const { setNodes, addNode, updatePosition, removeNode, selectedNode } =
  nodesSlice.actions;

export default nodesSlice.reducer;
export const nodesReducer = nodesSlice.reducer;
