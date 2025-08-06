import { SignIn as SignInPage } from "@clerk/react-router";

function SignIn() {
  return (
    <div className="flex justify-center xl:px-35 md:px-10 px-4">
      <div className="mt-10">
        <SignInPage />
      </div>
    </div>
  );
}

export default SignIn;
