import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { SetPopupContext } from "../../App";
import Loading from "../../components/Loading/Loading";
import { callAxios, useAxios } from "../../hooks/axiosUtils";
// import "./user.css";
import { UserContainer } from "./userSC";

export default function Word() {
  const [word, setWord] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { character, pinyin, englishTranslation, sentence } = word;
  const { wordId } = useParams();
  useAxios(
    "get",
    `words/${wordId}`,
    setWord,
    (data) => data.doc,
    null,
    setIsLoading
  );

  const setPopup = useContext(SetPopupContext);

  const handleUpdate = (e) => {
    e.preventDefault();
    callAxios("put", `words/${wordId}`, null, null, word);
    setPopup({
      open: true,
      severity: "success",
      message: "word updated successfully",
    });
  };

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "30rem",
        marginRight: "10rem",
      }}
    >
      <Loading />
    </div>
  ) : (
    <UserContainer>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit Word</h1>
          <Link to="/newUser">
            {/* <button className="userAddButton">Create</button> */}
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowBottom">
              <span className="userShowTitle">Word Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{character}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{pinyin}</span>
              </div>

              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{englishTranslation}</span>
              </div>

              {/* <span className="userShowTitle">{englishTranslation}</span> */}
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{sentence}</span>
              </div>
              {/* <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{sentence}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div> */}
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Character</label>
                  <input
                    type="text"
                    value={character}
                    // className="userUpdateInput"
                    className="form-input"
                    onChange={(e) =>
                      setWord((data) => ({
                        ...data,
                        character: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Pinyin</label>
                  <input
                    value={pinyin}
                    onChange={(e) =>
                      setWord((data) => ({ ...data, pinyin: e.target.value }))
                    }
                    type="text"
                    placeholder="Anna Becker"
                    // className="userUpdateInput"
                    className="form-input"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>English</label>
                  <input
                    type="text"
                    // placeholder="annabeck99@gmail.com"
                    // className="userUpdateInput"
                    className="form-input"
                    value={englishTranslation}
                    onChange={(e) =>
                      setWord((data) => ({
                        ...data,
                        englishTranslation: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Sentence</label>
                  <input
                    value={sentence}
                    onChange={(e) =>
                      setWord((data) => ({
                        ...data,
                        sentence: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Please input a sentence"
                    // className="userUpdateInput"
                    className="form-input"
                  />
                </div>
                {/* <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div> */}
              </div>
              <div className="userUpdateRight">
                <button className="wordUpdateButton" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </UserContainer>
  );
}
