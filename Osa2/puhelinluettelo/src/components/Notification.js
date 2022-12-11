const Notification = ({msg, className}) => {
    if (msg === null) {
        return null
    }

    return (
        <div className={className}>
            {msg}
        </div>
    )
}

export default Notification