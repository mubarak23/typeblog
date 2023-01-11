import * as express from 'express'

class ResponseHelper {
    public success (res: express.Response, data: any , statusCode= 200){
        res.status(statusCode).json({
            success: true,
            data,
            statusCode
        })
    }
    public error(res: express.Response, message: string, statusCode = 500): void {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }

    public notFound (res: express.Response, message= 'Not Found'){
        this.error(res, message, 404)
    }

    public forbidden(res: express.Response, message = 'Forbidden'): void {
        this.error(res, message, 403);
    }

    public conflict(res: express.Response, message = 'Conflict'): void {
        this.error(res, message, 409);
    }

    public methodNotAllowed(res: express.Response, message = 'Method Not Allowed'): void {
        this.error(res, message, 405);
    }

    public unauthorized(res: express.Response, message = 'Unauthorized'): void {
        this.error(res, message, 401);
    }

    public created(res: express.Response, data: any): void {
        this.success(res, data, 201);
    }

    public accepted(res: express.Response, data: any): void {
        this.success(res, data, 202);
    }

    public noContent(res: express.Response): void {
        this.success(res, null, 204);
    }

    public badRequest(res: express.Response, message = 'Bad Request'): void {
        this.error(res, message, 400);
    }
}