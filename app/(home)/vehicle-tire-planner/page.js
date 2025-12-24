"use client";

import { useState, useEffect } from "react";
import { Container, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { useHeaderBreadcrumb } from "hooks/useHeaderBreadcrumb";
import VehicleFlow from "./_components/VehicleFlow";

export default function VehicleLayoutPage() {
  const { setHeader, setBreadcrumb } = useHeaderBreadcrumb();

  const [type, setType] = useState("CAR");

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
          <VehicleFlow type={type} />
        </Card.Body>

        <Card.Footer className="text-muted py-2">
          <small>Click on tires for details | Top view layout</small>
        </Card.Footer>
      </Card>
    </Container>
  );
}
