import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFieds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFieles] = useState(defaultFormFieds);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFieles(defaultFormFieds);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password
      );
      await createUserDocumentFromAuth(user, { displayName: displayName });
      resetFormFields();
    } catch (error) {
      console.log(
        "error creating the user with email and password",
        error.message
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFieles({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>I do not have an account</h2>
      <span>Sign up with your email an password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Pasword"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
