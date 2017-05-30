import React, { Component } from 'react';
import './ChefReg.css';
import validator from 'validator';


class ChefReg extends Component {

  constructor(props){
    super(props);
    this.state = {
        PwMismatch: false,
       signupError: false,
       loginError: false,
       redirect: false,
       emptyLoginPassword: false,
       emptySignupPassword: false,
       emptySignupFirstName: false,
       emptySignupLastName: false,
       emptyChefHourlyRate: false,
       emptySignupPhoneNumber: false,
       emptyLoginEmail: false,
       emptySignupEmail: false,
       emptyChefDescription: false
    }
  }

    handleChefLogin = (e) => {
        e.preventDefault();
        let email = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;
        if (!validator.isEmail(email) || validator.isEmpty(email)) {
            return this.setState({emptyLoginEmail: true});
        }
        if(password.trim() === "") {
            return this.setState({emptyLoginPassword: true});
        }else{
            let oReq = new XMLHttpRequest(),
                method = "POST",
                url = "/cheflogin";
            oReq.open(method, url);
            oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            const self=this;
            oReq.onreadystatechange = function () {
              if(oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200) {
                localStorage.setItem('jwtToken', oReq.responseText);
                /* eslint-disable no-restricted-globals */
                location.assign('/Users');
              }else if (oReq.responseText === 'Bad Request'){
                return self.setState({loginError: true});
              }
            };
            oReq.send(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        }
    }

    handleChefSignup = (e) => {
        e.preventDefault();
        let first_name = document.getElementById('chefFirstName').value;
        let last_name = document.getElementById('chefLastName').value;
        let email = document.getElementById('chefEmail').value;
        let password = document.getElementById('chefPassword').value;
        let passwordConf = document.getElementById('chefPasswordConf').value;
        let hourlyRate = document.getElementById('chefHourlyRate').value;
        let phoneNumber = document.getElementById('chefPhoneNumber').value;
        let description = document.getElementById('chefDescription').value;

        if(validator.isEmpty(first_name) || first_name.replace(/\W/g, "") === "") {
            return this.setState({emptySignupFirstName: true});
        }
        if(validator.isEmpty(last_name)) {
            return this.setState({emptySignupLastName: true});
        }
        if(!validator.isEmail(email)) {
            return this.setState({emptySignupEmail: true});
        }
        if (validator.isEmpty(password)) {
            return this.setState({emptySignupPassword: true});
        }
        if(validator.isEmpty(hourlyRate)) {
            return this.setState({emptyChefHourlyRate: true});
        }
        if(!validator.isNumeric(phoneNumber) || validator.isEmpty(phoneNumber)) {
            return this.setState({emptySignupPhoneNumber: true});
        }
        if (password !== passwordConf){
            return this.setState({PwMismatch: true});
        }else{
            let oReq = new XMLHttpRequest(),
                method = "POST",
                url = "/signup";
            oReq.open(method, url);
            oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            const self = this;
            oReq.onreadystatechange = function () {
              if(oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200) {
                localStorage.setItem('jwtToken', oReq.responseText);
                 /*eslint-disable no-restricted-globals*/
                location.assign('/Users');
              }else if(oReq.responseText === 'Bad Request'){
                return self.setState({signupError: true});
              }
            };
            oReq.send(`firstName=${encodeURIComponent(first_name)}&lastName=${encodeURIComponent(last_name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&hourlyRateInCents=${encodeURIComponent(hourlyRate)}&phoneNumber=${encodeURIComponent(phoneNumber)}&description=${encodeURIComponent(description)}`);
        }
    }

  render(){
    return(
      <div>
         <section className="main">
                <h2>Chef Login</h2>
                    <h7>{this.state.loginError ? "Invalid login" : null}</h7>
                    <form id="login-form" onSubmit={this.handleChefLogin} >
                        <div>
                        <h8>{this.state.emptyLoginEmail ? "This field cannot be empty" : null}</h8>
                        <label>Email:</label>
                        <input type="email" name="email" id="login-email" /><br/>
                        </div>
                        <div>
                        <h8>{this.state.emptyLoginPassword ? "This field cannot be empty" : null}</h8>
                        <label>Password:</label>
                        <input type="password" name="password" id="login-password"/>
                        </div>
                        <div>
                        <input type="submit" value="Submit" />
                        </div>
                    </form>

                <h2>Chef Registration</h2>
                    <form action="/chefreg" onSubmit={this.handleChefSignup}>
                    <h8>{this.state.emptySignupFirstName ? "Invalid Entry" : null}</h8>
                    <textarea id="chefFirstName" type = "textarea" name="firstName" placeholder="First Name"></textarea><br/>
                    <h8>{this.state.emptySignupLastName ? "Invalid Entry" : null}</h8>
                    <textarea id="chefLastName" type = "textarea" name="lastName" placeholder="LastName"></textarea><br/>
                    <h8>{this.state.emptySignupEmail ? "Invalid Entry" : null}</h8>
                    <textarea id="chefEmail" type = "email" name="email" placeholder="Email"></textarea><br/>
                    <h8>{this.state.emptySignupPassword ? "Invalid Entry" : null}</h8>
                    <textarea id="chefPassword" type = "textarea" name="password" placeholder="Password"></textarea><br/>
                    <h8>{this.state.PwMismatch ? "Password mismatch" : null}</h8>
                    <textarea id="chefPasswordConf" type = "textarea" name="passwordConfirmation" placeholder="Password Confirmation"></textarea><br/>
                    <h8>{this.state.emptySignupPhoneNumber ? "Invalid Entry" : null}</h8>
                    <textarea id="chefPhoneNumber" type = "textarea" name="phone" placeholder="Phone #"></textarea><br/>
                    <h8>{this.state.emptyChefDescription ? "Invalid Entry" : null}</h8>
                    <textarea id="chefDescription" type = "textarea" name="description" placeholder="Cooking background/description"></textarea><br/>
                    <h8>{this.state.emptyChefHourlyRate ? "Invalid Entry" : null}</h8>
                    <textarea id="chefHourlyRate" type = "textarea" name="phone" placeholder="Hourly Rate"></textarea><br/>
                    <input id="submit" type="submit" />
                    <p class="error"></p>
                    </form>
            </section>
      </div>
  )
}
}

export default ChefReg;