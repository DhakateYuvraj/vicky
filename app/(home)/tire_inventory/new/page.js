"use client";

import { Card, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { useRouter } from "next/navigation";

import { tireSchema } from "./_validation/tireSchema";
import SectionWrapper from "./_components/SectionWrapper";
import BasicIdentificationSection from "./_components/BasicIdentificationSection";
import TechnicalSpecsSection from "./_components/TechnicalSpecsSection";
import AdditionalDetailsSection from "./_components/AdditionalDetailsSection";

import { useHeaderBreadcrumb } from "hooks/useHeaderBreadcrumb";

export default function AddNewTirePage() {
    const router = useRouter();
  const { setHeader, setBreadcrumb } = useHeaderBreadcrumb();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setHeader("Add New Tire");
    setBreadcrumb(["Home", "Tire Inventory", "Add New Tire"]);
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
            tireId: "",
            serialNumber: "",
            dotNumber: "",
            brand: "",
            model: "",
            size: "",
            type: "",
            status: "",
            purchaseDate: "",
            purchaseCost: "",
            supplierName: "",
            treadDepth: "",
            notes: "",
          }}
          validationSchema={tireSchema}
          onSubmit={(values) => {
            console.log(values);
            setAlert({
              type: "success",
              message: "Tire added successfully",
            });
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Card className="shadow-sm mb-3">
                <Card.Header>
                  <strong>Basic Identification</strong>
                </Card.Header>

                <Card.Body>
                  <BasicIdentificationSection formik={formik} />
                </Card.Body>
              </Card>

              <SectionWrapper title="Technical Specifications" defaultOpen>
                <TechnicalSpecsSection formik={formik} />
              </SectionWrapper>

              <SectionWrapper title="Additional Details">
                <AdditionalDetailsSection formik={formik} />
              </SectionWrapper>

              <div className="d-flex justify-content-between align-items-center m-3">
                {/* LEFT */}
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    formik.resetForm();
                    setAlert(null);
                  }}
                >
                  Clear All
                </Button>

                {/* RIGHT */}
                <div className="d-flex gap-2">
<Button
  variant="secondary"
  type="button"
  onClick={() => router.push("/tire_inventory")}
>
  Cancel
</Button>

                  <Button type="submit" variant="primary">
                    Save Tire
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
