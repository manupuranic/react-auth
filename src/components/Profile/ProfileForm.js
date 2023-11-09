import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = passwordInputRef.current.value;
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        authCtx.login(data.idToken);
        authCtx.logout();
        history.push("/auth");
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
