export const getStringDate = function (dateMS: number) {
    const monthNames: { [num: number]: string } = {
        0: "Января",
        1: "Февраля",
        2: "Марта",
        3: "Апреля",
        4: "Мая",
        5: "Июня",
        6: "Июля",
        7: "Августа",
        8: "Сентября",
        9: "Октября",
        10: "Ноября",
        11: "Декабря",
    }

    const date = new Date(dateMS);
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const showedHours = hours > 9 ? hours : `0${hours}`;
    const showedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const showedSeconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${year} / ${day} ${month} / ${showedHours}:${showedMinutes}:${showedSeconds}`;
}

export const getQueryLink = (value: string, page?: number) => value ? `/?q=${value}&p=${page ?? 1}` : '/';