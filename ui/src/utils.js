const roundDecimals = (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
};

const localTimeString = (datetime) => {
    return new Date(datetime).toLocaleDateString();
};

export { roundDecimals, localTimeString };
