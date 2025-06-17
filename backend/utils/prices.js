const FREE_SHIPPING = 100;
const TAX_PERCENTAGE = 0.15;

const roundDecimalsStr = (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
};

const roundDecimalsNum = (value) => {
    const v = (Math.round(value * 100) / 100).toFixed(2);
    return Number(v);
};

const calculatePrices = (products, orderItems) => {
    const productsPrice = products.reduce((acc, product) => {
        const orderItem = orderItems.find((item) =>
            product._id.equals(item._id)
        );
        return product.price * orderItem.qty + acc;
    }, 0);
    const tax = productsPrice * TAX_PERCENTAGE;
    const shipping = productsPrice >= FREE_SHIPPING ? 0 : 10;

    return {
        productsPrice: roundDecimalsNum(productsPrice),
        tax: roundDecimalsNum(tax),
        shipping: roundDecimalsNum(shipping),
        total: roundDecimalsNum(productsPrice + tax + shipping),
    };
};

export { calculatePrices };
