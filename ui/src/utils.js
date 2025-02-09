const roundDecimals = (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
};

const localDateString = (datetime) => {
    return new Date(datetime).toLocaleDateString();
};

const localTimeString = (datetime) => {
    return new Date(datetime).toLocaleString();
};

export { roundDecimals, localDateString, localTimeString };
