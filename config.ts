const config = {
    dev: {
        jwtSecret: "asnbiub234&*#$Y*",
        jwtExpiry: "1D"
    }
};

export default config[ process.env.ENV || "dev" ]