class apiResponse {
    constructor(statusCode, message="Success", data=null) {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.data = data;
        this.message = message;
    }
}

export { apiResponse }