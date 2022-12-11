import Header from "./Header"
import Content from "./Content"

const Course = ({course}) => (
    <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
    </>
)

export default Course