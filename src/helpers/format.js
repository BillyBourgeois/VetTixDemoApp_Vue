
export const format = {
    dateTime
};

function dateTime(date, time) {
    
    let output = new Date(date + ' ' + time);
    if (isNaN(output)) { return '';}
    return output.toDateString() + ' ' + output.getHours() + ':' + output.getMinutes().toString().padStart(2, '0');
}