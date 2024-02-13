const getBackgroundColor = (status) => {
  switch (status) {
    case 'To Do': return '#f2502c'; // Laranja
    case 'Doing': return '#91c494'; // Azul
    case 'Ready': return '#cad17a'; // Verde
    default: return 'transparent';
  }
};

export default getBackgroundColor