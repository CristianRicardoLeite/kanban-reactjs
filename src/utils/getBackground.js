const getBackgroundColor = (status) => {
  switch (status) {
    case 'To Do': return '#BB2D3B';
    case 'Doing': return '#FFCA2C';
    case 'Ready': return '#157347';
    default: return 'transparent';
  }
};

export default getBackgroundColor;
