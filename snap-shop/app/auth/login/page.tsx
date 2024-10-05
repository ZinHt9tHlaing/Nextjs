import AuthForm from "@/components/auth/auth-form";

const Login = () => {
  return (
    <AuthForm
      formTitle="Login to your account"
      footerLabel="Don't u have an account?"
      footerHref="/auth/register"
      showProvider
    >
      <h2>Login Form</h2>
    </AuthForm>
  );
};

export default Login;
