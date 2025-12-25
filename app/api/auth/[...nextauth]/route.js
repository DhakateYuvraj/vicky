import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "lib/firebase";

// 👇 EXPORT THIS
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Firebase",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          credentials.email,
          credentials.password
        );

        const token = await userCredential.user.getIdToken();

        return {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          accessToken: token,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },

  jwt: {
    maxAge: 2 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.expiresAt = Date.now() + 2 * 60 * 60 * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.expires = new Date(token.expiresAt).toISOString();
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

// 👇 THESE are only HTTP handlers
export { handler as GET, handler as POST };
