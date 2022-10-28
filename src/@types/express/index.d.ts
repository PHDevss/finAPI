import { Account } from "../../models/Account";

declare global {
    namespace Express {
        interface Request {
            customer: Account
        }
    }
}