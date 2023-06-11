import Part from "./Part";

import { CoursePart } from "../App";

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = (props: ContentProps) => (
    <div>
        {props.courseParts.map(coursePart => (
            <div key={coursePart.name}>
                <Part coursePart={coursePart} />
                <br/>
            </div>
        ))}
    </div>
);

export default Content;