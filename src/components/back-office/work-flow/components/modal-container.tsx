import { Container, Input, Menu, Modal, Pagination } from "@mantine/core";
// import { Pagination } from "@ui";
import { Button, Checkbox, Select } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MarkerType } from "reactflow";
import { RootState } from "../store/app.store";
import { addEdge, removeEdge } from "../store/edges.slice";
import { HandleColors, getHandleColor, getHandleId } from "../store/handle.slice";
import { addNode, updatePosition } from "../store/nodes.slice";
import { nodesList } from "./node";

interface Props {
  opened: boolean;
  onClose: () => void;
  returned: boolean;
  fromEdge: boolean;
  edgeId: string;
  otherProps: any;
}

const ModalContainer: React.FC<Props> = ({
  opened,
  onClose,
  returned,
  fromEdge,
  edgeId,
  otherProps,
}) => {
  const dispatch = useDispatch();
  const handletype = useSelector((state: RootState) => state.handle);

  const edges = useSelector((state: RootState) => state.edges.edges);
  const nodes = useSelector((state: RootState) => state.nodes.nodes);

  const [modalContent, setModalContent] = useState("ModalContent1");

  const [choosenTask, setChoosenTask] = useState<any>(null);

  const sourceHandle = getHandleId(handletype);

  const strokeColor = getHandleColor(handletype);

  const [filterValue, setFilterValue] = useState<string[]>([]);

  const [tasksList, setTasksList] = useState([]);
  const [unFliteredTaskList, setUnFliteredTaskList] = useState([]);

  // const tasksList = nodesList.filter((node) => {
  //   return node.id === 2 || !nodes.some((n) => n.id === node.id.toString()) || node.label.includes(taskSearch)
  // });

  useEffect(() => {
    const filteredTasks:any = nodesList.filter((node) => {
      return !nodes.some((n) => n.id === node.id.toString() || node.id === 2);
    });
    setTasksList(filteredTasks);
    setUnFliteredTaskList(filteredTasks);
  }, [nodes]);

  const handles:any = {
    start: ["default"],
    formBased: ["Yes"],
    review: ["ReviewApprove", "ReviewReject", "ReviewAdjust"],
    confirmation: ["ConfirmationYes", "ConfirmationNo"],
    payment: ["ElectronicPayment", "CashPayment"],
    parallel: ["Yes"],
    notification: ["Yes"],
    redirect: ["Yes"],
    end: [],
  };

  const addCustomEdge = ({
    id,
    source,
    sourceHandle,
    target,
    strokeColor,
    label,
    targetHandle = returned ? "Returned-left" : "in",
  }:any) => {
    const newEdge = {
      id: `${id}`,
      source: `${source}`,
      sourceHandle: sourceHandle,
      target: `${target}`,
      targetHandle: `${targetHandle}`,
      animated: false,
      style: { stroke: `${strokeColor}`, strokeWidth: 2 },
      type: "buttonedge",
      label: `${label}`,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
        color: strokeColor,
      },
    };

    dispatch(addEdge(newEdge));
  };

  const handleAddNodeFromEdge = (type: string, id: string, label: string) => {
    if (handles[type].length > 1) {
      setModalContent("ModalContent2");
      return;
    }
    const edge:any = edges.find((e) => e.id === edgeId);

    // Find the source node of the edge
    const sourceNode:any = nodes.find((n) => n.id === edge.source);

    // Find the target node of the edge
    const targetNode:any = nodes.find((n) => n.id === edge.target);

    const position = {
      x: 85,
      y: targetNode.position.y,
    };

    const extractNumberCharacter = (str: string) => {
      const match = str.match(/\d+/);
      return match ? match[0] : null;
    };

    let numberCharacter:any = ""

    if(sourceNode.type === "parallelStart") {
      numberCharacter = extractNumberCharacter(sourceNode.id)
    } else if(sourceNode.type === "parallelEnd") {
      numberCharacter = ""
    }
    else {
      numberCharacter = extractNumberCharacter(sourceNode.data.type); 
    }

    const newNode = {
      id: `${id}`,
      type: type,
      position,
      data: { label: label, type: `${sourceNode.type === "parallelStart" || sourceNode.type === "parallel" ? `parallel1${numberCharacter}` : ""}` },
      style: { width: "278px", height: "37px" }
    };

    dispatch(updatePosition({ addedNode: id, y: targetNode.position.y }));

    dispatch(addNode(newNode));

    handleAddEdgeFromEdge(type, id, label);
  };

  const handleAddEdgeFromEdge = (type: string, id: string, label: string) => {
    const edge:any = edges.find((e) => e.id === edgeId);

    const nodeType = type;

    // Find the source node of the edge
    const sourceNode:any= nodes.find((n) => n.id === edge.source);

    // Find the target node of the edge
    const targetNode:any = nodes.find((n) => n.id === edge.target);

    addCustomEdge({
      id: `${sourceNode.id}-${id}`,
      source: sourceNode.id,
      sourceHandle: edge.sourceHandle,
      target: `${id}`,
      strokeColor: `${edge.style.stroke}`,
      label: `${edge.label}`,
    });

    addCustomEdge({
      id: `${id}-${targetNode.id}`,
      source: id,
      sourceHandle: handles[nodeType][0],
      target: `${targetNode.id}`,
      strokeColor: `${strokeColor}`,
      label: ``,
    });

    dispatch(removeEdge(edgeId));
  };

  const handleAddNodeAndEdgeFromHandle = (
    type: string,
    id: string,
    label: string
  ) => {

    const sourceNode:any = nodes.find((n) => n.id === otherProps.id);

    const position = {
      x: nodes.length >= 3 ? sourceNode.position.x : 85, 
      y: otherProps.yPos + 120,
    };

    const extractNumberCharacter = (str: string) => {
      const match = str.match(/\d+/);
      return match ? match[0] : null;
    };

    let numberCharacter:any = ""

    if(sourceNode.type === "parallelStart") {
      numberCharacter = extractNumberCharacter(sourceNode.id)
    } else if(sourceNode.type === "parallelEnd") {
      numberCharacter = ""
    }
    else {
      numberCharacter = extractNumberCharacter(sourceNode.data.type); 
    }

    const newNode = {
      id: `${id}`,
      type: type,
      position,
      data: { label: label, type: `${sourceNode.type === "parallelStart" || sourceNode.data.type?.includes("parallel") ? `parallel${numberCharacter}` : ""}`},
      style: { width: "278px", height: "37px" }
    };
    dispatch(addNode(newNode));

    // ${handletype.label}
    const handleLabels = handles[otherProps.type];

    addCustomEdge({
      id: `${otherProps.id}-${id}`,
      source: `${otherProps.id}`,
      sourceHandle: sourceHandle,
      target: `${id}`,
      strokeColor: `${strokeColor}`,
      label:
        handleLabels && handleLabels.length > 1 ? `${handletype.label}` : ``,
    });

    onClose();
    setModalContent("ModalContent1");
  };

  const handleClick = (type: string, id: string, label: string) => {
    if (fromEdge) {
      handleAddNodeFromEdge(type, id, label);
    } else {
      handleAddNodeAndEdgeFromHandle(type, id, label);
    }
  };

  const renderButton = (button: {
    label: string;
    type: string;
    id: number;
  }) => (
    <div
      key={button.id}
      onClick={() => {
        setChoosenTask(button);
        setModalContent("ModalContent2");
        handleClick(button.type, button.id.toString(), button.label);
      }}
      className="p-2 bg-slate-200 hover:bg-slate-400 mb-2 cursor-pointer"
    >
      {button.label}
    </div>
  );

  const [searchValue, onSearchChange] = useState("");
  const [handlesData, setHandlesData] = useState<any>({});

  const initialFormValues:any = {};
  if (choosenTask) {
    handles[choosenTask.type].forEach((handle: string | number) => {
      initialFormValues[handle] = "";
    });
  }

  const form = useForm({
    initialValues: initialFormValues,
  });

  const dropDownTasks = nodes
    .filter((node) => node.id !== "1") // Exclude node with id of "1"
    .map((node) => ({
      value: node.id,
      label: node.data.label || `Node ${node.id}`,
      disabled: false,
    }));

  const handleSelectChange = (value: string, task: string) => {
    setHandlesData({ ...handlesData, [task]: value });
  };

  const handleSubmit = () => {

    const edge:any = edges.find((e) => e.id === edgeId);

    // Find the source node of the edge
    const sourceNode:any = nodes.find((n) => n.id === edge.source);

    // Find the target node of the edge
    const targetNode:any = nodes.find((n) => n.id === edge.target);

    const position = {
      x: 85,
      y: targetNode?.position.y,
    };

    dispatch(
      addNode({
        id: `${choosenTask.id}`,
        type: choosenTask.type,
        position,
        data: { label: choosenTask.label },
        style: { width: "278px", height: "37px" }
      })
    );

    addCustomEdge({
      id: `${sourceNode.id}-${choosenTask.id}`,
      source: `${sourceNode.id}`,
      sourceHandle: edge.sourceHandle,
      target: `${choosenTask.id}`,
      strokeColor: `${strokeColor}`,
      label: `${edge.label}`,
    });

    const handleColors = HandleColors;

    handles[choosenTask.type].forEach((handle: string) => {
      const strokeColor2 = handleColors[handle];
      addCustomEdge({
        id: `${choosenTask.id}-${handlesData[handle]}`,
        source: `${choosenTask.id}`,
        sourceHandle: handle,
        target: `${handlesData[handle]}`,
        strokeColor: `${strokeColor2}`,
        label: `${handle}`,
        targetHandle: handle === "ReviewAdjust" ? "Returned-left" : "in",
      });
    });

    dispatch(
      updatePosition({ addedNode: choosenTask.id, y: targetNode.position.y })
    );

    dispatch(removeEdge(edgeId));
  };

  const handleInputChange = (event: { target: { value: any; }; }) => {
    const keyword = event.target.value; // Get the new input value from the event

    if (keyword !== '') {
      const searchResult = unFliteredTaskList.filter((node:any) => {
        return node.label.toLowerCase().includes(keyword.toLowerCase());
      });
      setTasksList(searchResult);
    } else {
      const initialList = unFliteredTaskList.filter((node:any) => {
        return !nodes.some((n) => n.id === node.id.toString());
      });
      setTasksList(initialList);
    }
  };

  const handleFilterChange = (selectedValues: string | any[]) => {
    if(selectedValues.length !== 0) {
      const filterResult = unFliteredTaskList?.filter((node:any) => {
        return ( selectedValues.includes(node.type) )
      })
      setTasksList(filterResult)
    }
    else {
      const initialList = unFliteredTaskList.filter((node:any) => {
        return !nodes.some((n) => n.id === node.id.toString())
      })
      
      setTasksList(initialList)
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  

  const getModalContent = () => {
    const itemsPerPage = 5; // number of items to display per page
    const totalPages = Math.ceil(tasksList.length / itemsPerPage); // calculate total number of pages

    // Calculate the starting index and ending index of the items to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    // Use the slice() function to extract the portion of items for the current page
    const itemsToDisplay = tasksList.slice(startIndex, endIndex);

    const onPageChange = (event: any) => {
      //console.log(event)
    }

    switch (modalContent) {
      case "ModalContent1":
        return (
          <div className="min-h-[350px]">
            <Modal.Title></Modal.Title>
            <Modal.Body>
              Please select task from the below available ones.
              <div className="flex justify-between pt-2 pb-2">
                <Input
                  icon={<IconSearch />}
                  placeholder="Search"
                  className="w-64"
                  onChange={handleInputChange}
                />

                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button className="bg-white text-black rounded-none shadow-sm shadow-slate-500">
                      Filter By
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Filter by</Menu.Label>
                    <Menu.Divider />
                    <Menu.Label>Task Type</Menu.Label>
                    <Checkbox.Group
                      value={filterValue}
                      onChange={handleFilterChange}
                    >
                      <Menu.Item>
                        <Checkbox value="request" label="Request" />
                      </Menu.Item>
                      <Menu.Item>
                        <Checkbox value="confirmation" label="Confirmation" />
                      </Menu.Item>
                      <Menu.Item>
                        <Checkbox value="review" label="Review" />
                      </Menu.Item>
                      <Menu.Item>
                        <Checkbox value="payment" label="Payment" />
                      </Menu.Item>
                    </Checkbox.Group>
                  </Menu.Dropdown>
                </Menu>
              </div>
              <Container className="p-0">
                <div className="flex flex-col pt-2">
                  {itemsToDisplay.map(renderButton)}
                </div>
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={setCurrentPage}
                  position="center"
                />
                {/* <Pagination
                  total={tasksList.length}
                  pageSize={[5]}
                  onPaginationChange={onPageChange}
                  /> */}
              </Container>
            </Modal.Body>
          </div>
        );
      case "ModalContent2":
        return (
          <div className="h-24">
            <Modal.Title></Modal.Title>
            <Modal.Body>
           <Form form={form} onSubmit={handleSubmit}>
                <div className="mt-2 mb-2">
                  <p className="mb-4">
                    You chose a task with more than one output. Please assign to
                    which each handle should go to below.
                  </p>
                  {choosenTask && (
                    <div>
                      {handles[choosenTask.type].map((handle:any) => (
                        <div className="mb-2" key={handle}>
                          <Select
                            label={handle}
                            data={dropDownTasks}
                            placeholder="Pick a task"
                            maxDropdownHeight={100}
                            onChange={(event:any) =>
                              handleSelectChange(event, handle)
                            }
                            value={handlesData[handle]}
                            withAsterisk
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="mt-4 mb-4 float-right"
                    color="blue"
                    variant="outline"
                  >
                    Continue
                  </Button>
                </div>
             </Form>
            </Modal.Body>
          </div>
        );
    }
  };

  const handleClose = () => {
    onClose();
    setModalContent("ModalContent1");
  };

  return (
      <Modal opened={opened} onClose={handleClose} centered size={540}>
        {getModalContent()}
      </Modal>
  );
};

export default ModalContainer;
