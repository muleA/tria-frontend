import { createSlice } from '@reduxjs/toolkit';
import { Edge, MarkerType } from 'reactflow';

interface State {
  edges: Edge[];
  hovered: boolean
}

const initialState: State = {
  edges:[],
  hovered: false,
};

export const edgesSlice = createSlice({
  name: 'edges',
  initialState,
  reducers: {
    addEdge: (state, action) => {
      const { animated, style, type, label, markerEnd, id, source, target } = action.payload;
      const existingEdgeIndex = state.edges.findIndex(edge => {
        return source===target || edge.id === id;
      });
        if (existingEdgeIndex !== -1) {
            return state;
        }

      const newEdge = {
        ...action.payload,
        animated: animated !== undefined ? animated : true,
        style: style !== "" ? style : { stroke: 'black' },
        type: type !== undefined ? type : 'step',
        label: label !== undefined ? label : '',
        markerEnd: markerEnd !== undefined ? markerEnd : { type: MarkerType.Arrow, width: 35, height: 35, color: 'black' },
      };
      state.edges.push(newEdge);
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    removeEdge: (state, action) => {
      console.log("Remove edge getting called with: ", action.payload)
      const index = state.edges.findIndex(edge => edge.id === action.payload);
      if (index !== -1) {
        state.edges.splice(index, 1);
      }
    },
    updateEdge: (state, action) => {
      const { oldEdge, newConnection } = action.payload;
      console.log({ newConnection });
    
      const updatedEdges = state.edges.map(edge =>
        edge.id === oldEdge.id
          ? {
              ...edge,
              ...newConnection,
              id: `${newConnection.source}-${newConnection.target}`,
            }
          : edge
      );
    
      state.edges = updatedEdges;
    },
    
    setHovered: (state, action) => {
      state.hovered = action.payload
    }
  },
});

export const { addEdge, setEdges, removeEdge, setHovered } = edgesSlice.actions;

export default edgesSlice.reducer;

export const edgesReducer = edgesSlice.reducer
