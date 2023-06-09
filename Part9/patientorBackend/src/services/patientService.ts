import patients from '../../data/patients';

import { NonSensitivePatient } from '../types';

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default { getNonSensitiveEntries };