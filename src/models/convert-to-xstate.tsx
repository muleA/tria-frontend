interface ReactFlowNode {
  id: string;
  type: string;
  data: {
    label: string;
    type: string;
  };
  position: {
    x: number;
    y: number;
  };
}

interface ReactFlowEdge {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
}

interface ReactFlowJson {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
}

interface XStateJsonState {
  on: Record<string, string | { target: string }>;
  meta: {
    type: string;
    apiUrl?: string;
  };
}

interface XStateJson {
  id: string;
  states: Record<string, XStateJsonState>;
  initial: string;
}

export function convertReactFlowToXState(
  reactFlowJson: ReactFlowJson
): XStateJson {
  const xStateJson: XStateJson = {
    id: "Workflow",
    states: {},
    initial: "",
  };

  const nodes = reactFlowJson.nodes;
  const edges = reactFlowJson.edges;
  console.log("xStateJson===", xStateJson);
  console.log("nodes", nodes);
  // Create states based on nodes
  nodes.forEach((node) => {
    const nodeId = node.id;
    const nodeType = node.type.toLowerCase();

    xStateJson.states[nodeId] = {
      on: {},
      meta: {
        type: nodeType,
      },
    };

    if (nodeType === "start") {
return null
    }

    if (nodeType === "end") {
      xStateJson.states[nodeId].meta.apiUrl = ""; // Set your API URL here
    }
  });

  edges.forEach((edge) => {
    const sourceId = edge.source;
    const targetId = edge.target;

    if (edge.sourceHandle === "default") {
      xStateJson.states[sourceId].on[edge.targetHandle] = targetId;
    } else {
      const targetNode = nodes.find((node) => node.id === targetId);
      const targetLabel = targetNode?.data.label || "";

      // Replace "in 3" with the corresponding label
      const sourceLabel =
        nodes.find((node) => node.id === sourceId)?.data.label || "";
      xStateJson.states[sourceId].on[edge.sourceHandle] =
        targetLabel !== ""
          ? targetLabel.replace(/t\\/g, "")
          : sourceLabel !== ""
          ? sourceLabel.replace(/t\\/g, "")
          : targetId;
    }
  });

  // Replace numeric indexes with target labels
  const statesWithLabels: Record<string, XStateJsonState> = {};
  Object.keys(xStateJson.states).forEach((key) => {
    const label = nodes.find((node) => node.id === key)?.data.label || "";
    statesWithLabels[label !== "" ? label.replace(/t\\/g, "") : key] =
      xStateJson.states[key];
  });

  xStateJson.states = statesWithLabels;

  return xStateJson;
}
