import styled from "styled-components";
export const UserContainer = styled.div`
  flex: 4;
  padding: 20px;
  .newUserForm {
    display: flex;
    flex-wrap: wrap;
  }
  .grammarUrl {
    background-color: red;
  }
  .user {
    flex: 4;
    padding: 20px;
  }

  .userTitleContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .userAddButton {
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;
  }

  .userContainer {
    display: flex;
    margin-top: 20px;
  }

  .userShow {
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  }

  .userUpdate {
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
  }
  .userCreate {
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
    margin-right: 20rem;
  }
  .wordCreate {
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 8rem;
    margin-right: 20rem;
  }

  .userShowTop {
    display: flex;
    align-items: center;
  }

  .userShowImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .userShowTopTitle {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .userShowUsername {
    font-weight: 600;
  }

  .userShowUserTitle {
    font-weight: 300;
  }

  .userShowBottom {
    margin-top: 20px;
  }

  .userShowTitle {
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
  }

  .userShowInfo {
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
  }

  .userShowIcon {
    font-size: 16px !important;
  }

  .userShowInfoTitle {
    margin-left: 10px;
    color: white;
  }

  .userUpdateTitle {
    font-size: 24px;
    font-weight: 600;
  }

  .userUpdateForm {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .userUpdateItem {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }

  .userUpdateItem > label {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .userUpdateInput {
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
  }

  .userUpdateRight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .userUpdateUpload {
    display: flex;
    align-items: center;
  }

  .userUpdateImg {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
  }

  .userUpdateIcon {
    cursor: pointer;
  }

  .userUpdateButton {
    border-radius: 6px;
    border: none;
    padding: 9px;
    margin-top: 7rem;
    margin-right: 4rem;
    cursor: pointer;
    background-color: var(--darkerOrange);
    color: white;
    font-weight: 600;
  }
  .wordUpdateButton {
    border-radius: 6px;
    border: none;
    padding: 9px;
    margin-top: 16rem;
    margin-right: 4rem;
    cursor: pointer;
    background-color: var(--darkerOrange);
    color: white;
    font-weight: 600;
  }
  .userCreateButton {
    border-radius: 6px;
    border: none;
    padding: 9px;
    margin-top: 7rem;
    margin-right: 5rem;
    cursor: pointer;
    background-color: var(--darkerOrange);
    color: white;
    font-weight: 600;
  }
  .wordCreateButton {
    border-radius: 6px;
    border: none;
    padding: 9px;
    margin-top: 2rem;
    margin-right: 5rem;
    cursor: pointer;
    background-color: var(--darkerOrange);
    color: white;
    font-weight: 600;
  }
`;
