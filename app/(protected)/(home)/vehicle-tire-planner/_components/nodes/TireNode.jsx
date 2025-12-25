export default function TireNode({ data }) {
  const { size = 'normal',onClick } = data;
  
  const dimensions = {
    normal: { width: 50, height: 25 },
    large: { width: 60, height: 30 },
  }[size];

  return (
    <div
      onClick={onClick}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: dimensions.height / 2,
        background: '#111827',
        border: `3px solid ${size === 'large' ? '#f59e0b' : '#374151'}`,
        color: 'white',
        fontSize: size === 'large' ? 10 : 9,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        // Tire structure
        boxShadow: `
          0 2px 6px rgba(0,0,0,0.5),
          inset 0 1px 4px rgba(255,255,255,0.3),
          inset 0 -1px 4px rgba(0,0,0,0.5)
        `,
      }}
    >
        {data.label}
      {/* Tire sidewall details */}
      <div
        style={{
          position: 'absolute',
          top: 3,
          left: 5,
          right: 5,
          height: 3,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 3,
          left: 5,
          right: 5,
          height: 3,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 2,
        }}
      />

    </div>
  );
}