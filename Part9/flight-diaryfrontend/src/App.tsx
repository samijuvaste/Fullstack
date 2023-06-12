import { useState, useEffect } from "react";
import axios from "axios";

import { NonSensitiveDiaryEntry, Weather, Visibility } from "./types";
import { getAllEntires, createEntry } from "./services/diaryService";

import Notification from "./components/Notification";
import RadioGroup from "./components/RadioGroup";
import Entry from "./components/Entry";

const App = () => {
    const [notification, setNotification] = useState('');
    const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        getAllEntires()
            .then(data => setEntries(data));
    }, []);

    const notify = (message: string) => {
        setNotification(message);
        setTimeout(() =>
            setNotification(''), 5000
        );
    };

    const entryCreation = (event: React.SyntheticEvent, ) => {
        event.preventDefault();
        createEntry({
            date,
            visibility,
            weather,
            comment
        }).then(data => {
            setEntries(entries.concat(data));
        }).catch(error => {
            if (axios.isAxiosError(error)) {
                notify(error.response?.data);
            } else notify('Error occured');
        });
    };

    return (
        <div>
            <h2>Add new entry</h2>
            <Notification message={notification} />
            <form onSubmit={entryCreation}>
                <div>
                    date
                    <input
                        type='date'
                        value={date}
                        onChange={event => setDate(event.target.value)}
                    />
                </div>
                <RadioGroup
                    name='visibility'
                    options={Object.values(Visibility).map(v => v.toString())}
                    onChange={setVisibility}
                />
                <RadioGroup
                    name='weather'
                    options={Object.values(Weather).map(w => w.toString())}
                    onChange={setWeather}
                />
                <div>
                    comment
                    <input
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                    />
                </div>
                <button type='submit'>add</button>
            </form>
            <h2>Diary entries</h2>
            {entries.map(entry => (
                <Entry key={entry.id} entry={entry} />
            ))}
        </div>
    );
};

export default App;