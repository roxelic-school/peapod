function convert(data) {
    const formattedObj = {};

    Object.keys(data).forEach(date => {
        const [month, day, year] = date.split("/");
        const newDate = `${day}/${month}/${year}`;
        formattedObj[newDate] = data[date];
    });

    return formattedObj;
}

module.exports = { convert };