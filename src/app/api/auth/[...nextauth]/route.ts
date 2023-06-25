import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  })

export { handler as GET, handler as POST }