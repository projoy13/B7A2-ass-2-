import type { JwtPayload } from "jsonwebtoken";
declare global {
    namespace express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
//# sourceMappingURL=index.d.ts.map