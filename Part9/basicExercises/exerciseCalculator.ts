import { calculateExercises } from "./calculators";

interface ExerciseData {
    target: number;
    days: number[];
}

const parseArguments = (args: string[]): ExerciseData => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let target: number;
    const days: number[] = [];
    
    if (!isNaN(Number(args[2]))) {
        target = Number(args[2]);
    } else {
        throw new Error('Provided target was not a number!');
    }

    let i = 3;
    while (i < args.length) {
        if (!isNaN(Number(args[i]))) {
            days.push(Number(args[i]));
        } else {
            throw new Error('All provided values were not numbers!');
        }
        i += 1;
    }

    return { target, days };
};

try {
    const { target, days } = parseArguments(process.argv);
    console.log(calculateExercises(days, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}