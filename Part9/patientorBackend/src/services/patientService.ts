import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient: Patient = {
        ...patient,
        id: uuid()
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
    const newEntry: Entry = {
        ...entry,
        id: uuid()
    };
    patients.find(p => p.id === patientId)?.entries.push(newEntry);
    return newEntry;
};

export default { getNonSensitivePatients, findById, addPatient, addEntry };