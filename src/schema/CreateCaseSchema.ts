import { z } from "zod";

export const AddressSchema = z.object({
  zip: z.string(),
  city: z.string(),
  address: z.string(),
});

export const FormAddressSchema = z.object({
  home: AddressSchema,
  billing: AddressSchema,
  sample: AddressSchema,
});

export const IdentificationSchema = z.object({
  type: z.number(),
  number: z.string(),
  taj: z.string(),
});

export const CompanySchema = z.object({
  name: z.string(),
  headquarters: z.string(),
  taxNumber: z.string(),
});

export const CreateCaseSchema = z.object({
  address: FormAddressSchema,
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  gender: z.boolean(),
  identification: IdentificationSchema,
  company: CompanySchema.optional(),
  birthday: z.date(),
});
