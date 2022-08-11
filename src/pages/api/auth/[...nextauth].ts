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
});
