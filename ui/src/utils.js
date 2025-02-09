const roundDecimals = (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
};

const localDateString = (datetime) => {
    return new Date(datetime).toLocaleDateString();
};

const localTimeString = (datetime) => {
    return new Date(datetime).toLocaleDateString({
        options: {
            hour: '2-digit',
            minute: '2-digit',
        },
    });
};

export { roundDecimals, localDateString, localTimeString };
