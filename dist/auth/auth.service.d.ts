export declare const authservice: {
    loginUserIntoBD: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
            created_at: any;
            updated_at: any;
        };
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map