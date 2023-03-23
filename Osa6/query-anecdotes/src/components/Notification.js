import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  //console.log(useNotificationValue)
  const notification = useNotificationValue()

  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification