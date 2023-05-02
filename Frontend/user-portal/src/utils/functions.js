import { notification } from "antd";

const openNotification = ({ message, description, duration = 0, type }) => {
  const args = {
    message,
    description,
    duration,
    placement: "topRight",
    type, onClose: () => {
        window.location.reload();
      }  
  };
  notification.open(args);
};


const openNotificationWoRefresh = ({ message, description, duration = 0, type }) => {
  const args = {
    message,
    description,
    duration,
    placement: "topRight",
    type, 
  };
  notification.open(args);
};

const timeParser = (input) => {
  if (!input) return null;
  return new Date(input).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export { openNotification, timeParser ,openNotificationWoRefresh};