import { auth } from "@/libs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/signin",
    newUser:"/signup"
   },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            (credentials as any).email || "",
            (credentials as any).password || ""
          );
          if (userCredential.user) {
            return userCredential.user;
          }
          return null;
        } catch (error) {
          console.error(error); // Log the error for debugging purposes
          return null; // Return null or handle the error as needed
        }
      }, 
    }),
  ],
};
export default NextAuth(authOptions);
