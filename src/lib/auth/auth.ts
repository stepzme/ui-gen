import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUser, getUserOrCreateByEmail } from "@/lib/data";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // First try to verify existing user
        let user = await verifyUser(credentials.email, credentials.password);
        
        // If admin credentials from env, create/get admin user
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          user = await getUserOrCreateByEmail(adminEmail, adminPassword, "Admin");
          return { 
            id: user.id, 
            email: user.email, 
            name: user.name,
            role: "OWNER" 
          } as any;
        }
        
        if (!user) return null;
        
        // For now, all users get OWNER role (can be changed later based on memberships)
        return { 
          id: user.id, 
          email: user.email, 
          name: user.name,
          role: "OWNER" 
        } as any;
      },
    }),
  ],
  session: { 
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.sub = user.email; // Use email as sub for consistency
      }
      return token;
    },
    async session({ session, token }: any) {
      (session as any).role = token.role;
      (session as any).user = {
        id: token.id || token.sub,
        email: token.email,
        name: token.name,
      };
      return session;
    },
  },
};

export type AuthOptions = typeof authOptions;


