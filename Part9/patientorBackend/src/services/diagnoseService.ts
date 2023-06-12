import diagnoses from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
    return diagnoses;
};

export default { getEntries };