import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return { id: "admin", email: adminEmail, role: "OWNER" } as any;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
        token.sub = user.email; // Use email as sub for consistency
      }
      return token;
    },
    async session({ session, token }: any) {
      (session as any).role = token.role;
      (session as any).user = {
        id: token.id || token.sub,
        email: token.email,
      };
      return session;
    },
  },
};

export type AuthOptions = typeof authOptions;


