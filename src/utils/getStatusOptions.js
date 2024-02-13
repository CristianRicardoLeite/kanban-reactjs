const getStatusOptions = (currentStatus) => {
  const allStatuses = ["To Do", "Doing", "Ready"];
  return allStatuses.filter(status => status !== currentStatus);
};

export default getStatusOptions