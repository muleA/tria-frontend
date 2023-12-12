import { Position } from "reactflow";

export type NodeProps<T = any> = {
    id: string;
    data: T;
    dragHandle?: boolean;
    type?: string;
    selected?: boolean;
    isConnectable?: boolean;
    zIndex?: number;
    xPos: number;
    yPos: number;
    dragging: boolean;
    targetPosition?: Position;
    sourcePosition?: Position;
  };