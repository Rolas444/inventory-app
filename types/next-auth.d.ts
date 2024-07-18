import  {DefaultSession} from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       email: string;
//       role: string;
//     };
//   }
 interface Session {
    user: {
        roleId?: string;
    }& DefaultSession["user"];
 }
    interface User {
        roleId?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}