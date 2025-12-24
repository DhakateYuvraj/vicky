export default function BodyNode({ data }) {
  const {
    shape = 'rectangle',
    width = 100,
    height = 100,
    color = '#e5e7eb',
    borderColor = '#64748b',
    details = true,
  } = data;

  const baseStyle = {
    width: width,
    height: height,
    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
    border: `3px solid ${borderColor}`,
    boxShadow: `
      inset 2px 2px 5px rgba(255,255,255,0.5),
      inset -2px -2px 5px rgba(0,0,0,0.1),
      2px 2px 8px rgba(0,0,0,0.1)
    `,
    position: 'relative',
  };

  if (shape === 'car') {
    return (
      <div
        style={{
          ...baseStyle,
          borderRadius: '20% 10% 10% 20%', // Rounded front, less rounded rear
        }}
      >
        {details && (
          <>
            {/* Car center line for symmetry */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                right: '10%',
                height: '2px',
                background: '#94a3b8',
                opacity: 0.3,
                transform: 'translateY(-50%)',
              }}
            />
            {/* Headlights indicators */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '5%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#fbbf24',
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '30%',
                left: '5%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#fbbf24',
                opacity: 0.7,
              }}
            />
            {/* Taillights indicators */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                right: '5%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '30%',
                right: '5%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.7,
              }}
            />
          </>
        )}
      </div>
    );
  }

  if (shape === 'truck') {
    return (
      <div
        style={{
          ...baseStyle,
          borderRadius: '15% 5% 5% 15%', // Truck shape
          background: `linear-gradient(135deg, #d1d5db, #9ca3afcc)`,
          borderColor: '#374151',
        }}
      >
        {details && (
          <>
            {/* Truck cabin separator */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                bottom: '10%',
                left: '25%',
                width: '3px',
                background: '#4b5563',
                opacity: 0.5,
              }}
            />
            {/* Cab window area */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '5%',
                width: '20%',
                height: '30%',
                border: '2px solid #4b5563',
                borderRadius: '5px',
                background: 'rgba(59, 130, 246, 0.2)',
              }}
            />
            {/* Headlights */}
            <div
              style={{
                position: 'absolute',
                top: '35%',
                left: '3%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#fbbf24',
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '35%',
                left: '3%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#fbbf24',
                opacity: 0.8,
              }}
            />
            {/* Taillights */}
            <div
              style={{
                position: 'absolute',
                top: '35%',
                right: '3%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '35%',
                right: '3%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.8,
              }}
            />
          </>
        )}
      </div>
    );
  }

  if (shape === 'multiAxleTruck') {
    return (
      <div
        style={{
          ...baseStyle,
          borderRadius: '12% 4% 4% 12%', // Long truck shape
          background: `linear-gradient(135deg, #9ca3af, #6b7280cc)`,
          borderColor: '#1f2937',
        }}
      >
        {details && (
          <>
            {/* Multiple sections for trailer */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                bottom: '10%',
                left: '20%',
                width: '3px',
                background: '#4b5563',
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '10%',
                bottom: '10%',
                left: '50%',
                width: '3px',
                background: '#4b5563',
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '10%',
                bottom: '10%',
                left: '75%',
                width: '3px',
                background: '#4b5563',
                opacity: 0.5,
              }}
            />
            {/* Cab window */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '3%',
                width: '15%',
                height: '30%',
                border: '2px solid #4b5563',
                borderRadius: '4px',
                background: 'rgba(59, 130, 246, 0.2)',
              }}
            />
            {/* Headlights */}
            <div
              style={{
                position: 'absolute',
                top: '35%',
                left: '1%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#fbbf24',
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '35%',
                left: '1%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#fbbf24',
                opacity: 0.8,
              }}
            />
            {/* Multiple taillights */}
            <div
              style={{
                position: 'absolute',
                top: '25%',
                right: '2%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '25%',
                right: '2%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '2%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.8,
                transform: 'translateY(-50%)',
              }}
            />
          </>
        )}
      </div>
    );
  }

  if (shape === 'miningTruck') {
    return (
      <div
        style={{
          ...baseStyle,
          borderRadius: '8% 20% 20% 8%', // Mining truck with large rear
          background: `linear-gradient(135deg, #6b7280, #4b5563cc)`,
          borderColor: '#111827',
        }}
      >
        {details && (
          <>
            {/* Large dump body indicator */}
            <div
              style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                bottom: '5%',
                left: '30%',
                border: '2px dashed #9ca3af',
                borderRadius: '10px',
                opacity: 0.4,
              }}
            />
            {/* Cab window */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '5%',
                width: '20%',
                height: '25%',
                border: '2px solid #374151',
                borderRadius: '6px',
                background: 'rgba(96, 165, 250, 0.3)',
              }}
            />
            {/* Large headlights */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '2%',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#fbbf24',
                opacity: 0.9,
                boxShadow: '0 0 8px #fbbf24',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '40%',
                left: '2%',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#fbbf24',
                opacity: 0.9,
                boxShadow: '0 0 8px #fbbf24',
              }}
            />
            {/* Multiple large taillights */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                right: '3%',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.9,
                boxShadow: '0 0 8px #ef4444',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '20%',
                right: '3%',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.9,
                boxShadow: '0 0 8px #ef4444',
              }}
            />
            {/* Center marker for scale */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '35%',
                right: '35%',
                height: '3px',
                background: '#d1d5db',
                opacity: 0.3,
                transform: 'translateY(-50%)',
              }}
            />
          </>
        )}
      </div>
    );
  }

  // Default rectangle (for basic shapes)
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: 18,
        background: color,
        border: `2px solid ${borderColor}`,
      }}
    />
  );
}