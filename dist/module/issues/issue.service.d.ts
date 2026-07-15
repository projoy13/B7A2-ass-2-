import type { IIssue } from "./issues.interface";
export declare const issueservice: {
    creatissueIntoBD: (payload: IIssue) => Promise<any>;
    getALlissueIntoBD: () => Promise<import("pg").QueryResult<any>>;
    getSingleIssueIntoBD: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateIssueIntoBD: (id: number, payload: IIssue) => Promise<import("pg").QueryResult<any>>;
    deleteIssueIntoBD: (id: number) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=issue.service.d.ts.map