import type { Request, Response } from "express";
export declare const issueController: {
    creatissue: (req: Request, res: Response) => Promise<void>;
    getAllissue: (req: Request, res: Response) => Promise<void>;
    getsingleissue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateissue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteissue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=issue.controller.d.ts.map