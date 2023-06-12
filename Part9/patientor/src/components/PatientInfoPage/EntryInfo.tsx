import { Entry, Diagnosis } from "../../types";

import TypeInfo from "./TypeInfo";

interface Props {
  entry: Entry;
  dianoses: Diagnosis[];
}

const EntryInfo = ({ entry, dianoses }: Props) => {
  return (
    <div style={{ border: "solid", borderRadius: "0.5em", marginBottom: "0.5em" }}>
      <TypeInfo entry={entry} />
      <ul>
        {entry.diagnosisCodes
            ? entry.diagnosisCodes.map(code => (
                <li key={code}>
                  {code} {dianoses.find(d => d.code === code)?.name}
                </li>
            ))
            : <></>
        }
      </ul>
      diagnose by {entry.specialist}
    </div>
  );
};

export default EntryInfo;