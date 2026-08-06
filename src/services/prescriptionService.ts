import { apiClient } from "../lib/apiClient";
import type { Prescription, PrescriptionDTO } from "../types/prescription";

export const prescriptionServices = {
  getPrescriptions: async () => {
    const data = await apiClient.get<Prescription[]>("/prescription");
    return data.data;
  },
  createPrescription: async (dto: PrescriptionDTO) => {
    const data = await apiClient.post("/prescriptions", dto);
    return data;
  },
};
