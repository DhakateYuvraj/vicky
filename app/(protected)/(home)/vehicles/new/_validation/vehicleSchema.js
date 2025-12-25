import * as Yup from "yup";

export const vehicleSchema = Yup.object({
  vehicleId: Yup.string().required("Vehicle ID is required"),
  registrationNumber: Yup.string().required("Registration is required"),
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.number().min(1990).max(new Date().getFullYear()),
  axleCount: Yup.number().min(2),
  status: Yup.string().required("Status is required"),
});
