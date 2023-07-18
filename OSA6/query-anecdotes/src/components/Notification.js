import React, {useEffect } from "react";
import { useNotification } from "../NotificationContext";
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  const { notification } = useNotification();
  const { dispatch } = useContext(NotificationContext);

  useEffect(() => {
    // Show the notification for 5 seconds when it changes
    if (notification !== null) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' }); // Dispatch the action to clear the notification
      }, 5000);

      // Clear the timeout when the component is unmounted or when the notification changes
      return () => clearTimeout(timeout);
    }
  }, [notification, dispatch]);

  if (notification === null) {
    return null;
  }

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;

