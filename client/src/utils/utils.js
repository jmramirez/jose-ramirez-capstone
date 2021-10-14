
export const longAgo =(date) => {
  let timeAgo;
  const today = new Date();

  //Check if the comment was posted years ago
  if(today.getFullYear() - date.getFullYear() > 1){
    timeAgo = `${today.getFullYear() - date.getFullYear()} years ago.`
  }
  //Check if the comment was posted 1 or less than 1 year ago
  else if(today.getFullYear() - date.getFullYear() === 1){
    if(today.getMonth() - date.getMonth() >= 0) {
      timeAgo = '1 year ago.'
    }
    else {
      timeAgo =`${(11 - parseInt(date.getMonth())) + (parseInt(today.getMonth())+ 1)} months ago.`
    }
  }
  //Check if the comment was posted the same year
  else if(today.getFullYear() - date.getFullYear() === 0) {
    if(today.getMonth() - date.getMonth() === 1) { //Check if the comment was posted 1 or less than 1 month but in between - E.g. = Period between  Feb 13 and Mar 01
      timeAgo = (date.getDate() - today.getDate()< 0) ? '1 month ago.' : `${30 - date.getDate() + today.getDate()} days ago.`
    }
    else if(date.getDate() - today.getDate() < 0) { //Check if the comment was posted One or less than one month but in between
      timeAgo = ((parseInt(today.getDate())) - (parseInt(date.getDate()))) >1 ? `${(parseInt(today.getDate())) - (parseInt(date.getDate()))} days ago.` : '1 day ago.'
    }
    else {
      if(today.getHours() - date.getHours() > 1) { //Check if the comment was posted hours ago
        timeAgo = `${today.getHours() - date.getHours()} hours ago.`;
      }
      else {
        if((today.getHours() - date.getHours() === 1)){ //Check if the comment was posted hours ago or less than 1 but in between - Eg. Period between 2:45 and  3:15
          timeAgo = ((60  - date.getMinutes()) + today.getMinutes()) > 59 ? '1 hour ago.' : `${(60  - date.getMinutes()) + today.getMinutes()} minutes ago.`;
        }
        else {
          if(today.getMinutes() - date.getMinutes() > 0){ //Check if the comment was posted 1 or more minutes ago.
            timeAgo = (today.getMinutes() - date.getMinutes()  === 1) ? '1 minute ago.' : `${today.getMinutes() - date.getMinutes()} minutes ago.`
          }
          else { //Check if the comment was posted seconds ago
            timeAgo = `${(parseInt(today.getSeconds())) - (parseInt(date.getSeconds()))} seconds ago.`
          }
        }
      }
    }
  }
  return timeAgo; //return the message
}