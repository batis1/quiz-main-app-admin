import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import QuestionList from "./pages/questionList/QuestionList";
import Question from "./pages/newQuestion/Question";
import test from "./pages/newQuestion/NewQuestion";
import AppUpload from "./upload/AppUpload";
import NewQuestion from "./pages/newQuestion/NewQuestion";
import useLocalStorage from "use-local-storage";
import Sidebar from "./components/sidebar/Sidebar";
import LessonList from "./components/LessonList";
import WordList from "./components/WordsLisrt";
import Word from "./pages/user/Word";
import NewWord from "./pages/user/NewWord";
import Lesson from "./pages/user/Lesson";
import { InputArray } from "./components/InputArray";
import NewLesson from "./pages/user/NewLesson";
import MessagePopup from "./components/MessagePopup";
import { createContext, useState, useReducer, useEffect } from "react";
import ScoreList from "./components/ScoreList";
import Login from "./upload/components/Login/Login";
import TutorList from "./pages/tutor/TutorList";
import Tutor from "./pages/user/Tutor";
export const SetPopupContext = createContext();

export const GlobalContext = createContext();

export const actions = {
  SET_LESSON_PARAMS: "SET_LESSON_PARAMS",
  SET_USER: "SET_USER",
  UPDATE_USER: "UPDATE_USER",
};

const initialState = {
  isGame: true,
  level: "",
  lessonId: "",
  searchInput: "",
  user: null,
};

const reducer = (
  state,
  { type, payload: { searchInput, level, isGame, lessonId, user, savedWords } }
) => {
  console.log({ type });
  switch (type) {
    case actions.SET_USER:
      return { ...state, user };

    default:
      return state;
  }
};

function App() {
  // () || 5 > 3 ? true : false;
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // get user from session storage
    // if user check timestamp

    try {
      const currentUser =
        JSON.parse(window.sessionStorage.getItem("currentUser")) ?? null;
      if (currentUser) {
        const valid = Date.now() - currentUser.timeStamp < 12000000;
        console.log({ valid });
        console.log("CURRENT USER AUTHD", currentUser);
        dispatch({
          type: actions.SET_USER,
          payload: { user: currentUser._doc },
        });
      }
    } catch {
      dispatch({
        type: actions.SET_USER,
        payload: { user: null },
      });
    }
  }, []);

  const history = useHistory();
  useEffect(() => {
    if (!state.user) {
      history.push("/login");
    }
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <SetPopupContext.Provider value={setPopup}>
        {/* <Router> */}
        <div className={`app`} data-theme={theme}>
          {state.user && <Topbar />}
          {}
          <div className={`container ${state.user ? "" : "login"}`}>
            {state.user && <Sidebar theme={theme} setTheme={setTheme} />}
            <Switch>
              <Route exact path="/">
                <UserList />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>

              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/questions">
                <QuestionList />
              </Route>

              <Route path="/lessons">
                <LessonList />
              </Route>

              <Route path="/tutors">
                <TutorList />
              </Route>

              <Route path="/words/:lessonId">
                <WordList />
              </Route>

              <Route path="/score/:userId">
                <ScoreList />
              </Route>

              <Route path="/word/:wordId">
                <Word />
              </Route>

              <Route path="/lesson/:lessonId">
                <Lesson />
              </Route>

              <Route path="/Tutor/:tutorId">
                <Tutor />
              </Route>
              <Route path="/newWord/:lessonId">
                <NewWord />
              </Route>
              <Route path="/question/:questionId">
                <Question />
              </Route>
              <Route path="/newquestion">
                <NewQuestion />
              </Route>

              <Route path="/newLesson">
                <NewLesson />
              </Route>

              <Route path="/test">
                <InputArray />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
            <MessagePopup
              open={popup.open}
              setOpen={(status) =>
                setPopup({
                  ...popup,
                  open: status,
                })
              }
              severity={popup.severity}
              message={popup.message}
            />
          </div>
        </div>
        {/* </Router> */}
      </SetPopupContext.Provider>
    </GlobalContext.Provider>
  );
}

export default App;
