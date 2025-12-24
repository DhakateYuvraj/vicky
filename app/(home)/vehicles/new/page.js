"use client";

import { Card, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { useRouter } from "next/navigation";

import SectionWrapper from "./_components/SectionWrapper";
import VehicleBasicSection from "./_components/VehicleBasicSection";
import VehicleSpecsSection from "./_components/VehicleSpecsSection";
import VehicleOperationalSection from "./_components/VehicleOperationalSection";

import { vehicleSchema } from "./_validation/vehicleSchema";
import { useHeaderBreadcrumb } from "hooks/useHeaderBreadcrumb";

export default function AddNewVehiclePage() {
  const router = useRouter();
  const { setHeader, setBreadcrumb } = useHeaderBreadcrumb();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setHeader("Add New Vehicle");
    setBreadcrumb(["Home", "Vehicle Management", "Add New Vehicle"]);
  }, []);

  return (
    <div className="container-fluid px-4 py-4">
      <Card className="shadow-sm">
        {alert && (
          <Alert
            variant={alert.type}
            className="d-flex align-items-center gap-2"
          >
            {alert.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <XCircle size={18} />
            )}
            {alert.message}
          </Alert>
        )}

        <Formik
          initialValues={{
            vehicleId: "",
            registrationNumber: "",
            vinNumber: "",
            make: "",
            model: "",
            year: "",
            vehicleType: "",
            axleCount: "",
            assignedDriver: "",
            currentOdometer: "",
            status: "",
            notes: "",
          }}
          validationSchema={vehicleSchema}
          onSubmit={(values) => {
            console.log("Vehicle Payload:", values);
            setAlert({
              type: "success",
              message: "Vehicle added successfully",
            });
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              {/* BASIC INFO */}
              <Card className="shadow-sm mb-3">
                <Card.Header>
                  <strong>Vehicle Identification</strong>
                </Card.Header>
                <Card.Body>
                  <VehicleBasicSection formik={formik} />
                </Card.Body>
              </Card>

              {/* TECHNICAL */}
              <SectionWrapper title="Vehicle Specifications" defaultOpen>
                <VehicleSpecsSection formik={formik} />
              </SectionWrapper>

              {/* OPERATIONAL */}
              <SectionWrapper title="Operational Details">
                <VehicleOperationalSection formik={formik} />
              </SectionWrapper>

              {/* ACTIONS */}
              <div className="d-flex justify-content-between align-items-center m-3">
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    formik.resetForm();
                    setAlert(null);
                  }}
                >
                  Clear All
                </Button>

                <div className="d-flex gap-2">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => router.push("/vehicles")}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" variant="primary">
                    Save Vehicle
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
