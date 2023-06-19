export const formatDateString = (dateString) => {
    var date = new Date(dateString),
    month = ("0" + (date.getMonth()+1)).slice(-2),
    day  = ("0" + date.getDate()).slice(-2),
    year = date.getFullYear();
    
    const dateParts = dateString.split(" ")
    const time = dateParts[4].substring(0, 5);
  
    return `${day}/${month}/${year} ${time}`;
}

export const DateFormat = (dataFormat) => {
    const dateObject = new Date(dataFormat);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const formattedDate = `${day}/${month}/${year} : ${hours}:${minutes}:${seconds}`;

    return formattedDate // ex : 2023-06-04T10:29:14.000000Z
}