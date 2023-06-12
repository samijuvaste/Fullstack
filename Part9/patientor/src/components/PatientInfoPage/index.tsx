import { Box, Typography,  } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient, Diagnosis } from "../../types";

import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";
import EntryInfo from "./EntryInfo";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientInfoPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id as string);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  if (patient) {
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
          <h2>entries</h2>
          {patient.entries.map(entry => (
            <EntryInfo key={entry.id} entry={entry} dianoses={diagnoses} />
          ))}
        </div>
      );
  } else return <></>;
};

export default PatientInfoPage;