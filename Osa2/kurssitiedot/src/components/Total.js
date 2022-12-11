const Total = ({parts}) => {

    const exercises = parts.map(part => part.exercises)
    const sum = exercises.reduce((a, b) => a + b, 0)

    return (
        <b>
            total of {sum} exercises
        </b>
    )
}

export default Total