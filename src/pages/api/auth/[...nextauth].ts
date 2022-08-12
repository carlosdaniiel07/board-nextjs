import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import environment from '../../../config/environment';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: environment.GITHUB_CLIENT_ID,
      clientSecret: environment.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, token }) {
      try {
        const userId = token.sub;
        return {
          ...session,
          userId,
        };
      } catch (err) {
        return session;
      }
    },
  },
});
