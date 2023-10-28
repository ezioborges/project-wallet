import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";
import { userAction } from "../../redux/actions";
import { useEffect, useState } from "react";
import { setUser } from "../../data/savedUser";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    disabled: true,
  });

  useEffect(() => {
    enableButton();
  }, [userData.email, userData.password]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const enableButton = () => {
    const { email, password } = userData;
    const PASSWORD_VALID = 6;
    const validEmail = /\S+@\S+\.\S+/;
    const res = validEmail.test(email);
    const disabled = !(res && password.length >= PASSWORD_VALID);
    setUserData({
      ...userData,
      disabled: disabled,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    const userResult = {
      username: username,
      email: email,
      password: password,
    };

    setUser(userResult);

    dispatch(userAction(userResult));
    history.push("/wallet");
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center background-content"
      style={{ minHeight: "100vh" }}
    >
      <form className="w-50 p-5 background-form-ligin">
        <div className="form-group mb-4">
          <label htmlFor="username">Nome</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            className="form-control mt-2"
            aria-describedby="emailHelp"
            placeholder="Digite seu nome..."
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            className="form-control mt-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Digite seu email..."
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            className="form-control mt-2"
            id="exampleInputPassword1"
            placeholder="Digite sua senha..."
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={userData.disabled}
            onClick={handleClick}
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
