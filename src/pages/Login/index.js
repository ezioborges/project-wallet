import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";
import { userAction } from "../../redux/actions";
import { useEffect, useState } from "react";
import { setUser } from "../../data/savedUser";
import { emailAndPasswordValidate } from "../../utils/validate";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorsMsg, setErrorsMsg] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateInputs = () => {
    const errors = emailAndPasswordValidate(userData.email, userData.password);

    setErrorsMsg(errors);

    return errors.length === 0;
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const { username, email, password } = userData;
      const userResult = {
        username: username,
        email: email,
        password: password,
      };

      setUser(userResult);

      dispatch(userAction(userResult));
      history.push("/wallet");
    }
  };
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center background-content"
        style={{ minHeight: "100vh" }}
      >
        <div className="row w-75">
          <div className="col-12">
            <form className="p-5 background-form-ligin">
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
                  onClick={handleClick}
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <ul>
            {errorsMsg &&
              errorsMsg.map((err) => (
                <div key={err} className="text-danger bg-white p-2 mt-3">
                  <li>
                    <span>{err}</span>
                  </li>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Login;
