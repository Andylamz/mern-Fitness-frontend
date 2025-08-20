import { SignUp as SignUpPage } from "@clerk/react-router";

function SignUp() {
  return (
    <div className="flex justify-center xl:px-35 md:px-10 px-4">
      <div className="mt-10">
        <SignUpPage />
      </div>
    </div>
  );
}

export default SignUp;
