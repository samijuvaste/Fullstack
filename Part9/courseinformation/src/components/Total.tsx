import { CoursePart } from "../App";

interface TotalProps {
    courseParts: CoursePart[];
}

const Total = (props: TotalProps) => (
    <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
);

export default Total;