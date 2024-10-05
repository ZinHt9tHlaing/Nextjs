import AuthForm from "@/components/auth/auth-form";

const Register = () => {
  return (
    <div>
      <AuthForm
        formTitle="Register a new account"
        footerHref="/auth/login"
        footerLabel="Already have an account?"
        showProvider
      >
        <h2>Register Form</h2>
      </AuthForm>
    </div>
  );
};

export default Register;
