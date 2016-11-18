import AppError from './appError';

class ApiError extends AppError {
    constructor(data = {}, code = 0, prevErr = undefined) {
        super(data.apiName || 'Api Error', code, prevErr, false); // no stack trace for api error
        this.data = data;
    }
}
export default ApiError;
