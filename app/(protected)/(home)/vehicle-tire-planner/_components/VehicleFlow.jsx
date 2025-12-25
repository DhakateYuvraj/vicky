'use client';

import { useEffect, useState } from 'react'; // Add useState
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TireNode from './nodes/TireNode';
import LabelNode from './nodes/LabelNode';
import BodyNode from './nodes/BodyNode';
import { carFixedLayout } from './layouts/car.top.layout';
import { truckFixedLayout } from './layouts/truck.top.layout';
import { multiAxleTruckFixedLayout } from './layouts/multiAxleTruck.top.layout';
import { miningTruckFixedLayout } from './layouts/miningTruck.top.layout';

const nodeTypes = {
  tire: TireNode,
  label: LabelNode,
  body: BodyNode,
};

export default function VehicleFlow({ 
    type,
  nodes,
  setNodes,
  onTireClick

 }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  //const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    let selectedLayout;
    switch (type) {
      case 'CAR':
        selectedLayout = carFixedLayout;
        break;
      case 'TRUCK':
        selectedLayout = truckFixedLayout;
        break;
      case 'MULTI_AXLE':
        selectedLayout = multiAxleTruckFixedLayout;
        break;
      case 'MINING':
        selectedLayout = miningTruckFixedLayout;
        break;
      default:
        selectedLayout = carFixedLayout;
    }

    setNodes(
      selectedLayout.nodes.map(n => ({
        ...n,
        data: {
          ...n.data,
          onClick: () => onTireClick(n)
        }
      }))
    );
    setEdges([]);
  }, [type]);

  // Don't render ReactFlow during SSR
  if (!isClient) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}

      /* 🔑 THIS IS THE KEY FIX */
      onNodeClick={(event, node) => {
        if (node.type === 'tire') {
          onTireClick(node);
        }
      }}

      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnScroll={false}
      panOnDrag={false}
      fitView
      fitViewOptions={{ padding: 0.2 }}
    >
      <Background gap={24} />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}