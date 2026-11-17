import AuthForm from "./AuthForm";

export default function RegisterForm() {
  return (
    <AuthForm
      endpoint="login"
      type="Login"
      inputs={
        <>
          <label>
            Email: <input type="email" name="email" id="email" />
          </label>
          <label>
            Password: <input type="password" name="password" id="password" />
          </label>
        </>
      }
    />
  );
}
