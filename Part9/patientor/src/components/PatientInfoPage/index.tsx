import { Box, Typography,  } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient, Diagnosis, NewEntry } from "../../types";

import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";
import EntryInfo from "./EntryInfo";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientInfoPage = ({ diagnoses }: Props) => {
  const [form, setForm] = useState("choose");
  const [patient, setPatient] = useState<Patient | undefined>();
  const [error, setError] = useState<string>();
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id as string);
      setPatient(patient);
    };
    void fetchPatient();
  }, [form, id]);

  if (!patient || !id) {
    return <></>
  }

  const submitForm = async (entry: NewEntry) => {
    try {
      await patientService.addEntry(entry, id);
      setForm("choose");
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  return (
    <div className="App">
      <Box>
        <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
          {patient.name}
          <GenderIcon gender={patient.gender} />
        </Typography>
      </Box>
      ssn: {patient.ssn}
      <br />
      occupation: {patient.occupation}
      <AddEntryModal
        form={form}
        setForm={setForm}
        onSubmit={submitForm} 
        diagnoses={diagnoses}
        error={error}
        setError={setError}
      />
      <br />
      <h2>entries</h2>
      {patient.entries.map(entry => (
        <EntryInfo key={entry.id} entry={entry} dianoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientInfoPage;