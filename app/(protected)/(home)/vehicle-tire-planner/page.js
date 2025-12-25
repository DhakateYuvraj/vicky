"use client";

import { useState, useEffect } from "react";
import { Container, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { useHeaderBreadcrumb } from "hooks/useHeaderBreadcrumb";
import VehicleFlow from "./_components/VehicleFlow";
import TireJobDrawer from "components/TireJobDrawer";

export default function VehicleLayoutPage() {
  const { setHeader, setBreadcrumb } = useHeaderBreadcrumb();

  const [type, setType] = useState("CAR");
  const [selectedTire, setSelectedTire] = useState(null);
  const [nodes, setNodes] = useState([]);

  const vehicleTypes = [
    { id: "CAR", label: "Car" },
    { id: "TRUCK", label: "Truck" },
    { id: "MULTI_AXLE", label: "Multi-Axle" },
    { id: "MINING", label: "Mining Truck" },
  ];

  const currentVehicle =
    vehicleTypes.find((v) => v.id === type)?.label || "Car";

  useEffect(() => {
    setHeader("Vehicle Tire Planner");
    setBreadcrumb(["Home", "Vehicle Tire Planner"]);
    return () => {
      setHeader("");
      setBreadcrumb([]);
    };
  }, [setHeader, setBreadcrumb]);


  const handleTireClick = (tireNode) => {
    setSelectedTire(tireNode);
  };

  const handleCloseDrawer = () => {
    setSelectedTire(null);
  };

  const handleSwapTires = (id1, id2) => {
    setNodes((prev) => {
      const n1 = prev.find((n) => n.id === id1);
      const n2 = prev.find((n) => n.id === id2);

      if (!n1 || !n2) return prev;

      return prev.map((n) => {
        if (n.id === id1) return { ...n, position: n2.position };
        if (n.id === id2) return { ...n, position: n1.position };
        return n;
      });
    });
  };

  return (
    <Container fluid className="py-3">
      <Card className="shadow-sm">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center py-2">
          <DropdownButton
            title={currentVehicle}
            variant="outline-primary"
            size="sm"
            align="end"
            className="vehicle-dropdown"
          >
            {vehicleTypes.map((vehicle) => (
              <Dropdown.Item
                key={vehicle.id}
                active={type === vehicle.id}
                onClick={() => setType(vehicle.id)}
                className="py-1"
              >
                {vehicle.label}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Card.Header>

        <Card.Body className="p-0" style={{ height: 400 }}>
          <VehicleFlow
            type={type}
            nodes={nodes}
            setNodes={setNodes}
            onTireClick={handleTireClick}
          />

          <TireJobDrawer
            show={!!selectedTire}
            onClose={handleCloseDrawer}
            tire={selectedTire}
            availableTires={nodes.filter((n) => n.type === "tire")}
            onSwap={handleSwapTires}
          />
        </Card.Body>

        <Card.Footer className="text-muted py-2">
          <small>Click on tires for details | Top view layout</small>
        </Card.Footer>
      </Card>
    </Container>
  );
}
