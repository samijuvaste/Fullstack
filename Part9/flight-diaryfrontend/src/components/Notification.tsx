const Notification = ({ message }: { message: string }) => {
    if (message === '') {
        return null;
    }

    return <div className='error'>{message}</div>;
};

export default Notification;