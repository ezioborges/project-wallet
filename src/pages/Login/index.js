import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import './index.css'
import { userAction } from "../../redux/actions";
import { useEffect, useState } from "react";

function Login () {
  const dispatch = useDispatch();
  const history = useHistory()
  const [user, setUser] = useState({
    email: '',
    password: '',
    disabled: true
  })  

  useEffect(() => {
    enableButton();
  }, [user.email, user.password]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUser({
      ...user,
      [name]: value,
    })
  };

  const enableButton = () => {
    const { email, password } = user;
    const PASSWORD_VALID = 6;
    const validEmail = /\S+@\S+\.\S+/;
    const res = validEmail.test(email);
    const disabled = !(res && password.length >= PASSWORD_VALID);
    setUser({
      ...user,
      disabled: disabled
    });
  }

  const handleClick = (e) => {
    e.preventDefault();
    const { email, password } = user;
    const userResult = {
      email: email,
      password: password
    }
    dispatch(userAction(userResult));
    history.push('/wallet');
  };
    return (
      <div
        className="d-flex justify-content-center align-items-center background-content"
        style={{ minHeight: "100vh" }}
      >
        <form className="w-50 p-5 background-form-ligin">
          <div className="form-group mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
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
              value={user.password}
              className="form-control mt-2"
              id="exampleInputPassword1"
              placeholder="Digite sua senha..."
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={ user.disabled }
            onClick={ handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

export default Login;
