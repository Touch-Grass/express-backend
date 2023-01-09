import { Request, Response, NextFunction } from 'express';

function addKeyValue(req: Request, res: Response, next: NextFunction) {
    res.send(Object.assign({}, res.json, {
        newKey: 'TEST THIS SHOULD ADD',
    }));
    next();
}

export default addKeyValue;
