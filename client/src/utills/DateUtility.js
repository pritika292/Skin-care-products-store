export function getFormattedDate(dateString) {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1; 
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    
    return `${formattedMonth}/${formattedDay}/${year}`;
  }

  