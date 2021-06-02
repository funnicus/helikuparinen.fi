export function getDateFI(date: string): string {
    const arr = date.split('-').join(' ').split('T');
    const dates = arr[0].split(' ');
    return dates[2] + '.' + dates[1] + '.' + dates[0];
}

export function getDateUS(date: string): string {
    const arr = date.split('-').join(' ').split('T');
    const dates = arr[0].split(' ');
    return dates[1] + '-' + dates[2] + '-' + dates[0];
}