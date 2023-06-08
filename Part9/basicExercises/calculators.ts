type Rating = 1 | 2 | 3;
type RatingDescription = 'please try' | 'not too bad but could be better' | 'great';

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: Rating;
    ratingDescription: RatingDescription;
    target: number;
    average: number;
}

export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / ((height / 100) * (height / 100));
    
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

export const calculateExercises = (days: number[], target: number): Result => {
    const periodLength: number = days.length;
    const average: number = days.reduce((sum, current) => sum + current) / periodLength;

    let rating: Rating = 1;
    let ratingDescription: RatingDescription = 'please try';
    if (average >= target) {
        rating = 3;
        ratingDescription = 'great';
    } else if (average > 0) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }

    return {
        periodLength,
        trainingDays: days.filter(hours => hours !== 0).length,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };
};