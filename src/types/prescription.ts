export type Medicine = {
  id: string;
  name: string;
  dosage: string;
  frequency: number;
};

export type Prescription = {
  id: string;
  patientName: string;
  patientAge: number;
  createdAt: string;
  medicines: Medicine[];
};
