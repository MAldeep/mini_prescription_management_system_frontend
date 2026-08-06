import z from "zod";

export const prescriptionSchema = z.object({
  patientName: z.string().min(3, "patient's name is required"),
  patientAge: z.number().min(1).max(120),
  medicines: z.array(
    z.object({
      name: z.string().min(3, "Medication name is required"),
      dosage: z.string().min(3, "Dosage is required"),
      frequency: z.string().min(3, "frequency is Required"),
    }),
  ),
});

export type PrescriptionSchema = z.infer<typeof prescriptionSchema>;
