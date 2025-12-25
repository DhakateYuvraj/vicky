// components/reactflow/nodes/LabelNode.jsx
export default function LabelNode({ data }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: '#475569',
        whiteSpace: 'nowrap',
      }}
    >
      {data.text}
    </div>
  );
}
