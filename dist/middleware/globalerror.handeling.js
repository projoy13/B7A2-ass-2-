const globalErrorHander = (err, req, res, next) => {
    console.error(err.stack); // Log the error
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
export default globalErrorHander;
//# sourceMappingURL=globalerror.handeling.js.map