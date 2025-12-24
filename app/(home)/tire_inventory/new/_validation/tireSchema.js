import * as Yup from 'yup';

export const tireSchema = Yup.object({
  tireId: Yup.string().required('Tire ID required'),
  serialNumber: Yup.string().required('Serial Number required'),
  dotNumber: Yup.string().required('DOT Number required'),

  brand: Yup.string().required(),
  model: Yup.string().required(),

  size: Yup.string()
    .matches(/\d{3}\/\d{2}R\d{2}/, 'Invalid size format')
    .required(),

  type: Yup.string().required(),
  status: Yup.string().required(),

  purchaseDate: Yup.date().required(),
  purchaseCost: Yup.number().positive().required(),
  supplierName: Yup.string().required(),

  treadDepth: Yup.number().min(0).max(50).required(),
});
