import { SignUp, useUser } from "@clerk/nextjs";


const SignUpPage = () => { 
 return (
   <div className="flex items-center justify-center h-screen w-full">
       <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" redirectUrl="/sign-up/register" />
  </div>
  )
};

export default SignUpPage;