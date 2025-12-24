'use client';

import { useEffect } from 'react';
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

export default function VehicleFlow({ type }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Reset layout on switch
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

    setNodes(selectedLayout.nodes);
    setEdges([]);
  }, [type]); // Only depend on type

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      nodesDraggable={true}
      nodesConnectable={false}
      elementsSelectable
      zoomOnScroll={false}
      panOnDrag={true}
      fitView
    >
      <Background gap={24} />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}