import { NonSensitiveDiaryEntry } from "../types";

const Entry = ({ entry }: { entry: NonSensitiveDiaryEntry }) => (
    <div>
        <h3>{entry.date}</h3>
        visibility: {entry.visibility}
        <br/>
        weather: {entry.weather}
    </div>
);

export default Entry;