import { Entry, Diagnosis } from "../../types";

interface Props {
  entry: Entry;
  dianoses: Diagnosis[];
}

const EntryInfo = ({ entry, dianoses }: Props) => {
  return (
    <div>
      {`${entry.date} `}
      <i>{entry.description}</i>
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
    </div>
  );
};

export default EntryInfo;