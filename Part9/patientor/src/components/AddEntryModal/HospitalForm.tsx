import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntry } from "../../types";
import { Button, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

interface Props {
  show: boolean;
  onCancel: () => void;
  onSubmit: (newEntry: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const HospitalForm = ({ show, onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [criteria, setCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [chosenDiagnoses, setChosenDiagnoses] = useState<string[]>([]);

  const diagnosisOptions: string[] = diagnoses.map(d => d.code);

  const onDiagnosesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const diagnoses = event.target.value as string[];
    setChosenDiagnoses(diagnoses);
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      type: "Hospital",
      description,
      date,
      specialist,
      discharge: {
        criteria
      }
    };
    if (chosenDiagnoses.length > 0) {
      newEntry.diagnosisCodes = chosenDiagnoses;
    }
    if (dischargeDate) {
        newEntry.discharge.date = dischargeDate;
    }
    onSubmit(newEntry);
  };

  if (!show) return <></>;

  return (
    <div style={{ border: "dotted", borderRadius: "0.5em", marginBottom: "0.5em" }}>
      <h3>New Hospital Entry</h3>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          required
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Input
          type="date"
          required
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          required
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Discharge criteria"
          required
          fullWidth 
          value={criteria}
          onChange={({ target }) => setCriteria(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
        <Input
          type="date"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          label="Diagnoses"
          fullWidth
          value={chosenDiagnoses}
          multiple
          onChange={onDiagnosesChange}
        >
          {diagnosisOptions.map(option =>
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>  
          )}
        </Select>
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{ float: "right" }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HospitalForm;