import styled from "styled-components";

export const LoginContainer = styled.div`
  padding: 0 1em;
  .form-input-login,
  .btn {
    -webkit-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.3);
  }
  .form-input-login {
    font-family: "Poppins", sans-serif;
    color: var(--darkAccent);
    border-radius: 10px;
    width: 25rem;
    padding-top: 0.7rem;

    padding-bottom: 0.7rem;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .LoginAddButton {
    width: 190px;
    border: none;
    padding: 9px;
    margin-top: 2rem;
    background-color: var(--darkerOrange);
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;
  }
  .btn-primary {
    background: var(--orangeAccent);
    color: var(--lightAccent);
  }

  .LoginAddButton:hover {
    background: var(--darkerOrange);
  }
  .form-input-login-password,
  input {
    font-family: "Poppins", sans-serif;
    color: var(--darkAccent);
    border-radius: 10px;
    width: 25rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    font-size: 1rem;
  }
`;
