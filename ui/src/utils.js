const roundDecimals = (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
};

export { roundDecimals };
