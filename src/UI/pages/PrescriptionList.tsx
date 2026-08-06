import { usePrescriptions } from "../../hooks/usePrescriptions";

export default function PrescriptionList() {
  const { isLoading, prescriptions, isError } = usePrescriptions();

  if (isLoading) return <p>Loading Prescriptions ....</p>;
  if (isError) return <p>Error Loading Prescription</p>;
  return (
    <div>
      {prescriptions?.map((p) => (
        <div key={p.id}>
          <h2>{p.patientAge}</h2>
          <h3>{p.patientAge}</h3>
          <ul>
            {p.medicines.map((m) => (
              <li key={m.id}>
                <p>{m.name}</p>
                <p>{m.dosage}</p>
                <p>{m.frequency}</p>
              </li>
            ))}
          </ul>
          <h4>{p.createdAt}</h4>
        </div>
      ))}
    </div>
  );
}
