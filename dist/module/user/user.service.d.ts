import type { Iuser } from "./user.interface";
export declare const userService: {
    creatuserintoBD: (payload: Iuser) => Promise<any>;
    getalluserFromBD: () => Promise<import("pg").QueryResult<any>>;
    getsingleuserFromBD: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateuserFromBD: (payload: Iuser, id: string) => Promise<import("pg").QueryResult<any>>;
    deleteuserFromBD: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=user.service.d.ts.map