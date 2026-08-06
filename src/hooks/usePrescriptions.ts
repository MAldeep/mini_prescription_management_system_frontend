import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { prescriptionServices } from "../services/prescriptionService";
import type { PrescriptionDTO } from "../types/prescription";
export const QUERY_KEYS = {
  PRESCRIPTIONS: ["prescriptions"] as const,
};
export const usePrescriptions = () => {
  const querClient = useQueryClient();

  // query
  const prescriptionQuery = useQuery({
    queryKey: QUERY_KEYS.PRESCRIPTIONS,
    queryFn: prescriptionServices.getPrescriptions,
    staleTime: 5 * 60 * 1000,
  });
  const totalPrescriptionsCount = prescriptionQuery.data?.length ?? 0;
  // mutation
  const createPrescriptionMutation = useMutation({
    mutationFn: (dto: PrescriptionDTO) =>
      prescriptionServices.createPrescription(dto),
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: QUERY_KEYS.PRESCRIPTIONS });
    },
  });
  return {
    prescriptions: prescriptionQuery.data,
    isLoading: prescriptionQuery.isPending,
    isError: prescriptionQuery.isError,
    error: prescriptionQuery.error,
    totalPrescriptionsCount,
    createPrescription: createPrescriptionMutation.mutate,
    isCreating: createPrescriptionMutation.isPending,
  };
};
