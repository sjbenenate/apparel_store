import {
    ApiError,
    CheckoutPaymentIntent,
    Client,
    Environment,
    LogLevel,
    OrdersController,
} from '@paypal/paypal-server-sdk';

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, NODE_ENV } = process.env;

const paypalClient = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: PAYPAL_CLIENT_ID,
        oAuthClientSecret: PAYPAL_CLIENT_SECRET,
    },
    timeout: 0,
    environment:
        NODE_ENV !== 'production'
            ? Environment.Sandbox
            : Environment.Production,
    logging: {
        logLevel: NODE_ENV !== 'production' ? LogLevel.Info : LogLevel.Error,
        logRequest: {
            logBody: true,
        },
        logResponse: {
            logHeaders: true,
        },
    },
});

const paypalOrdersController = new OrdersController(paypalClient);

export default paypalOrdersController;
