import { SyntheticEvent, useState } from "react";
import { Diagnosis, HealthCheckRating, NewEntry } from "../../types";
import { Button, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

interface Props {
  show: boolean;
  onCancel: () => void;
  onSubmit: (newEntry: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const ratingOptions: number[] = Object.entries(HealthCheckRating)
  .filter(v => Number.isInteger(v[1]))
  .map(v => Number(v[1]));

const HealthForm = ({ show, onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState(HealthCheckRating.Healthy);
  const [chosenDiagnoses, setChosenDiagnoses] = useState<string[]>([]);

  const diagnosisOptions: string[] = diagnoses.map(d => d.code);

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if ( typeof event.target.value === "number") {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating).find(r => r === value);
      if (rating) {
        setRating(rating as HealthCheckRating);
      }
    }
  };

  const onDiagnosesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const diagnoses = event.target.value as string[];
    setChosenDiagnoses(diagnoses);
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: rating
    };
    if (chosenDiagnoses.length > 0) {
      newEntry.diagnosisCodes = chosenDiagnoses;
    }
    onSubmit(newEntry);
  };

  if (!show) return <></>;

  return (
    <div style={{ border: "dotted", borderRadius: "0.5em", marginBottom: "0.5em" }}>
      <h3>New HealthCheck Entry</h3>
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
        <InputLabel style={{ marginTop: 20 }}>Healthcheck rating</InputLabel>
        <Select
          label="Healthcheck Rating"
          required
          fullWidth
          value={rating}
          onChange={onRatingChange}
        >
          {ratingOptions.map(option =>
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          )}
        </Select>
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

export default HealthForm;