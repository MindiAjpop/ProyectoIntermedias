import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        };
        this.login = this.login.bind(this);
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    login(event){
        const params = {
            correo: this.state.email,
            password: this.state.password
        }

        axios.post('https://proyectopi-server.herokuapp.com/login',params)
        .then(res => {
            console.log(res)
            if(res.data.length==1){
                this.props.history.push("components/home");
            }
            else
                alert('Los datos ingresados son incorrectos. Intente nuevamente.')
        });
    }
 
    render() {
        return (
            <Router>
            <div className="auth-wrapper">
                <div className="auth-inner">

                    <h3>Iniciar Sesion {this.state.email}</h3>

                    <div className="form-group">
                        <label>Correo</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={this.myChangeHandler}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={this.myChangeHandler}/>
                    </div>

                    <button className="btn btn-primary btn-block" onClick={this.login.bind(this)}>Iniciar Sesion</button>
                    <p className="forgot-password text-right">
                        Olvidaste tu <a href="#">password?</a>
                    </p>
                </div>
            </div>
            </Router>
        );
    }
}
