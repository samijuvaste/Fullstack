import { Alert, Button } from "@mui/material";

import { Diagnosis, NewEntry } from "../../types";
import HealthForm from "./HealthForm";
import HospitalForm from "./HospitalForm";
import OccupationalForm from "./OccupationalForm";

interface Props {
  form: string;
  setForm: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (newEntry: NewEntry) => void;
  diagnoses: Diagnosis[];
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AddEntryModal = ({ form, setForm, onSubmit, diagnoses, error, setError }: Props) => {
  const onCloseForm = (): void => {
    setForm('choose');
    setError(undefined);
  }

  if (form === 'choose') {
    return (
      <div>
        <h3>Add entry</h3>
        <Button 
          onClick={() => setForm('health')}
          variant="contained"
          color="primary"
          style={{ marginRight: "0.5em" }}
        >
          Health Check Entry
        </Button>
        <Button 
          onClick={() => setForm('hospital')}
          variant="contained"
          color="primary"
          style={{ marginRight: "0.5em" }}
        >
          Hospital Entry
        </Button>
        <Button 
          onClick={() => setForm('occupational')}
          variant="contained"
          color="primary"
          style={{ marginRight: "0.5em" }}
        >
          Occupational Health Care Entry
        </Button>
      </div>
    );
  }
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <HealthForm 
        show={form === 'health'}
        onSubmit={onSubmit}
        onCancel={() => onCloseForm()}
        diagnoses={diagnoses}
      />
      <HospitalForm
        show={form === 'hospital'}
        onSubmit={onSubmit}
        onCancel={() => onCloseForm()}
        diagnoses={diagnoses}
      />
      <OccupationalForm
        show={form === 'occupational'}
        onSubmit={onSubmit}
        onCancel={() => onCloseForm()}
        diagnoses={diagnoses}
      />
    </div>
  );
};

export default AddEntryModal;