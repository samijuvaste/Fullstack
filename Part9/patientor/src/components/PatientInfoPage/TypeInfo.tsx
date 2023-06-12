import { LocalHospital, MedicalServices, Work, Favorite } from "@mui/icons-material";

import { Entry, HealthCheckRating } from "../../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const ratingToColor = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "yellow";
    case HealthCheckRating.HighRisk:
      return "red";
    case HealthCheckRating.CritcalRisk:
      return "black";
    default:
      return assertNever(rating);
  }
};

interface Props {
  entry: Entry;
}

const TypeInfo = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <>
          {entry.date}
          <LocalHospital />
          <br />
          <i>{entry.description}</i>
          <div style={{ marginTop: "0.5em" }}>
            Discharge criteria: {entry.discharge.criteria}
            <br />
            Discharged: {entry.discharge.date ? entry.discharge.date : "not"}
          </div>
        </>
      );
    case "HealthCheck":
      return (
        <>
          {entry.date}
          <MedicalServices />
          <br />
          <i>{entry.description}</i>
          <br />
          <Favorite style={{ color: ratingToColor(entry.healthCheckRating) }} />
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          {entry.date}
          <Work />
          <i>{entry.employerName}</i>
          <br />
          <i>{entry.description}</i>
        </>
      );
    default:
        return assertNever(entry);
  }
};

export default TypeInfo;