import {
    NewPatient, Gender, NewEntry, Diagnosis,
    HealthCheckRating, Discharge, SickLeave
} from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => Number(v)).includes(param);
};

const parseStringParameter = (parameter: unknown): string => {
    if (!isString(parameter)) {
        throw new Error('Incorrect data: ' + parameter);
    }
    return parameter;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};

//diagnosis codes are not properly parsed
const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> =>  {
    return codes as Array<Diagnosis['code']>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect gender: ' + rating);
    }
    return rating;
};

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('criteria' in object) {
        const discharge: Discharge = {
            criteria: parseStringParameter(object.criteria)
        };
        if ('date' in object) {
            discharge.date = parseDate(object.date);
        }
        return discharge;
    }
    throw new Error('Incorrect discharge: ' + object);
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('startDate' in object && 'endDate' in object) {
        const sickLeave: SickLeave = {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate)
        };
        return sickLeave;
    }
    throw new Error('Incorrect sick leave: ' + object);
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (
        'name' in object && 'dateOfBirth' in object && 'ssn' in object &&
        'gender' in object && 'occupation' in object
    ) {
        const newPatient: NewPatient = {
            name: parseStringParameter(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseStringParameter(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseStringParameter(object.occupation),
            entries: []
        };

        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): NewEntry => {
    if (
        !object || typeof object !== 'object' || !('type' in object) ||
        !('description' in object) || !('date' in object) ||
        !('specialist' in object)
    ) {
        throw new Error('Incorrect or missing data');
    }

    const baseEntry = ('diagnosisCodes' in object) 
        ? {
            description: parseStringParameter(object.description),
            date: parseDate(object.date),
            specialist: parseStringParameter(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        }
        : {
            description: parseStringParameter(object.description),
            date: parseDate(object.date),
            specialist: parseStringParameter(object.specialist)
        };

    switch (object.type) {
        case 'HealthCheck':
            if ('healthCheckRating' in object) {
                const newEntry: NewEntry = {
                    ...baseEntry,
                    type: 'HealthCheck',
                    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                };
                return newEntry;
            }
            break;
        case 'Hospital':
            if ('discharge' in object) {
                const newEntry: NewEntry = {
                    ...baseEntry,
                    type: 'Hospital',
                    discharge: parseDischarge(object.discharge)
                };
                return newEntry;
            }
            break;
        case 'OccupationalHealthcare':
            if ('employerName' in object) {
                const newEntry: NewEntry = {
                    ...baseEntry,
                    type: 'OccupationalHealthcare',
                    employerName: parseStringParameter(object.employerName)
                };
                if ('sickLeave' in object) {
                    newEntry.sickLeave = parseSickLeave(object.sickLeave);
                }
                return newEntry;
            }
            break;
    }
    throw new Error('Incorrect or missing data');
};