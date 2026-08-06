import { usePrescriptions } from "../../hooks/usePrescriptions";
import { useFieldArray, useForm } from "react-hook-form";
import {
  prescriptionSchema,
  type PrescriptionSchema,
} from "../../validations/prescriptionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PrescriptionDTO } from "../../types/prescription";
export default function PrescriptionForm() {
  const { createPrescription, isCreating } = usePrescriptions();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PrescriptionSchema>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      patientName: "",
      patientAge: 1,
      medicines: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });
  const onSubmit = (data: PrescriptionSchema) => {
    const prescription: PrescriptionDTO = {
      ...data,
      medicines: data.medicines.map((medicine, index) => ({
        ...medicine,
        id: String(index + 1),
      })),
    };

    createPrescription(prescription);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>New Prescription Form</h1>
      <input type="text" {...register("patientName")} />
      {errors.patientName && <p>{errors.patientName.message}</p>}
      <input
        type="number"
        {...register("patientAge", { valueAsNumber: true })}
      />
      {errors.patientAge && <p>{errors.patientAge.message}</p>}
      <div>
        {fields.map((med, idx) => (
          <div key={med.id}>
            <input
              type="text"
              {...register(`medicines.${idx}.name` as const)}
            />
            <input
              type="text"
              {...register(`medicines.${idx}.dosage` as const)}
            />
            <input
              type="text"
              {...register(`medicines.${idx}.frequency` as const)}
            />
            <button type="button" onClick={() => remove(idx)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ name: "", dosage: "", frequency: "" })}
      >
        Add medication
      </button>
      <button type="submit" disabled={isCreating}>
        {isCreating ? "Adding ..." : "Add"}
      </button>
    </form>
  );
}
