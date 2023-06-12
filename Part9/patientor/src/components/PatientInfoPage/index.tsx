import { Box, Typography,  } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "../../types";

import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";

const PatientInfoPage = () => {
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
        </div>
      );
  } else return <></>;
};

export default PatientInfoPage;