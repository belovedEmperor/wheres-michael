import AuthForm from "./AuthForm";

export default function RegisterForm() {
  return (
    <AuthForm
      endpoint="register"
      type="Register"
      inputs={
        <>
          <label>
            Username: <input type="text" name="username" id="username" />
          </label>
          <label>
            Email: <input type="email" name="email" id="email" />
          </label>
          <label>
            Password: <input type="password" name="password" id="password" />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </label>
        </>
      }
    />
  );
}
