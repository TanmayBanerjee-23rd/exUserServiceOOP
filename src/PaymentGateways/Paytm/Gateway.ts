import config from "./config";

class PaytmGateway {

    async makePayment() {

        return {
            "MID": config.mid,
            "WEBSITE": config.website,
            "TRX_URL": config.txn_url_staging
        };
    };

    verifyPayment() {
        return true;
    };
};

export default ( new PaytmGateway() );