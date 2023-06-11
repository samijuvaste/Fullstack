import { CoursePart } from "../App";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.kind) {
        case "basic":
            return <div>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <br/>
                <i>{coursePart.description}</i>
            </div>
        case "group":
            return <div>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <br/>
                project exercises {coursePart.groupProjectCount}
            </div>
        case "background":
            return <div>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <br/>
                <i>{coursePart.description}</i>
                <br/>
                submit to {coursePart.backgroundMaterial}
            </div>
        case "special":
            return <div>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <br/>
                <i>{coursePart.description}</i>
                <br/>
                required skills: {coursePart.requirements.join(", ")}
            </div>
        default:
            return assertNever(coursePart);
    }
};

export default Part;