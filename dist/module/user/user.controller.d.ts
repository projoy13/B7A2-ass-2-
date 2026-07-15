import type { Request, Response } from "express";
export declare const userController: {
    creatUser: (req: Request, res: Response) => Promise<void>;
    getallUser: (req: Request, res: Response) => Promise<void>;
    singleuser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateuser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteuser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=user.controller.d.ts.map