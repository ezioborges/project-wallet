import { connect } from "react-redux";
import React, { Component } from "react";
import './index.css'
import { userAction } from "../../redux/actions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  enableButton = () => {
    const { email, password } = this.state;
    const PASSWORD_VALID = 6;
    const validEmail = /\S+@\S+\.\S+/;
    const res = validEmail.test(email);
    this.setState({ desabled: true });
    if (res && password.length >= PASSWORD_VALID) this.setState({ disabled: false });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    const user = {
      email: email,
      password: password
    }
    console.log('user', user);
    dispatch(userAction(user));
    history.push('/wallet');
  };

  render() {
    const { email, password, disabled } = this.state
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
              value={email}
              className="form-control mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Digite seu email..."
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              value={password}
              className="form-control mt-2"
              id="exampleInputPassword1"
              placeholder="Digite sua senha..."
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
