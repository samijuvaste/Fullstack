import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntry } from "../../types";
import { Button, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

interface Props {
  show: boolean;
  onCancel: () => void;
  onSubmit: (newEntry: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const OccupationalForm = ({ show, onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employer, setEmployer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      employerName: employer,
    };
    if (chosenDiagnoses.length > 0) {
      newEntry.diagnosisCodes = chosenDiagnoses;
    }
    if (startDate || endDate) {
      newEntry.sickLeave = {
        startDate,
        endDate
      }
    }
    onSubmit(newEntry);
  };

  if (!show) return <></>;

  return (
    <div style={{ border: "dotted", borderRadius: "0.5em", marginBottom: "0.5em" }}>
      <h3>New Occupational Healthcare Entry</h3>
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
          label="Employer"
          required
          fullWidth 
          value={employer}
          onChange={({ target }) => setEmployer(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Start date for sick leave</InputLabel>
        <Input
          type="date"
          fullWidth
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>End date for sick leave</InputLabel>
        <Input
          type="date"
          fullWidth
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
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

export default OccupationalForm;