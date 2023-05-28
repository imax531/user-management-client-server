import express from 'express';
import { AppException } from '../exceptions/base';

export function asyncWrapper<T>(func: (req: express.Request, res: express.Response) => T) : (req: express.Request, res: express.Response) => void {
    return async (req: express.Request, res: express.Response) => {
        try {
            await func(req, res);
        } catch (e) {
            if (e instanceof AppException) {
                const error = e as AppException;
                res.status(error.code).send(error.message);
            } else {
                res.status(500).send('Internal error occured');
            }
        }
    };
}