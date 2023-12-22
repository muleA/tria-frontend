import { useDispatch } from 'react-redux';
import { Handle, Position } from 'reactflow';
import { addHandle } from '../store/handle.slice';



const EndNode = () => {
  const dispatch = useDispatch();
  

  return (
    <div className="flex justify-center items-center border-black-700 w-12 h-12 rounded-full bg-red-700 text-white">
      <Handle type="target" className='nodrag' position={Position.Top} id="in" 
        onClick={(event) => {dispatch(addHandle(((event.target as HTMLElement).dataset['handleid'])))}}>

        </Handle>
        <>End</>
    </div>
  );
}

export default EndNode;