import React from "react";
import { EdgeLabelRenderer, Position, getSmoothStepPath } from "reactflow";

import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ModalContainer from "./modal-container";

import { useSelector } from "react-redux";
import { RootState } from "../store/app.store";

const foreignObjectSize = 40;

function EdgeLabel({ transform, label }: { transform: string; label: string }) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const dx = event.clientX - offset.x;
      const dy = event.clientY - offset.y;
      setOffset({ x: event.clientX, y: event.clientY });
      transform = transform.replace(
        /translate\((.*?), (.*?)\)/,
        (_, x, y) => `translate(${Number(x) + dx}, ${Number(y) + dy})`
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        background: "transparent",
        padding: 10,
        color: "#000000",
        fontSize: 12,
        fontWeight: 700,
        transform,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: 10,
      }}
      className="drag nopan"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove as any}
    >
      {label}
    </div>
  );
}

interface CustomEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  style?: React.CSSProperties;
  markerEnd?: string;
  label?: any;
}


export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
}: CustomEdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [opened, { open, close }] = useDisclosure(false);

  const hovered = useSelector((state: RootState) => state.edges.hovered);

  const [edgeId, setEdgeId] = useState("");

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {hovered && (
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={labelX - foreignObjectSize / 2}
          y={labelY - foreignObjectSize / 2}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div className="flex justify-center items-center min-h-[40px]">
            <button
             
              className="w-[20px] text-md h-[20px] bg-gray-300 border border-black cursor-pointer rounded-full text-md hover:bg-green-700"
              onClick={() => {
                setEdgeId(id);
                open();
              }}
            >
              +
            </button>
          </div>
        </foreignObject>
      )}

     <EdgeLabelRenderer>
        <EdgeLabel
          transform={`translate(-50%, -90%) translate(${labelX}px,${labelY}px)`}
          label={label}
        />
      </EdgeLabelRenderer>

      <ModalContainer
        opened={opened}
        onClose={close}
        returned={false}
        fromEdge={true}
        edgeId={edgeId}
        otherProps={""}
      />
    </>
  );
}
