import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state,action) => {
  if (action.type === "PASSWORD_INPUT") {
    return { value: action.val, isValid: action.val.length > 6 };
  }

  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.length > 6 };
  }
  return { value: "", isValid: false };
}

const Login = (props) => {
 
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail] = useReducer(emailReducer,{ value : "", isValid : undefined});
  const [passwordState,dispatchPassword] = useReducer(passwordReducer,{ value : "", isValid : undefined});

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking validity");
      setFormIsValid(
        emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log("Clean Up");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val :event.target.value })
 };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "PASSWORD_INPUT", val :event.target.value })
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "PASSWORD_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
    authContext.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid){
      emailRef.current.focus();
    } else if (!passwordState.isValid) {
      passwordRef.current.focus();
    }
  };

  const authContext = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailRef} type="email" id="email" invalid={emailState.isValid} onChange={emailChangeHandler} onBlur={validateEmailHandler}>Email</Input>
        <Input ref={passwordRef} type="password" id="password" value={passwordState.value} invalid={passwordState.isValid} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}>Password</Input>
       <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
