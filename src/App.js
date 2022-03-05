import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import { createContext, useState } from "react";
export const SetPopupContext = createContext();

function App() {
  // () || 5 > 3 ? true : false;
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  return (
    <SetPopupContext.Provider value={setPopup}>
      <Router>
        <div className={`app`} data-theme={theme}>
          <Topbar />
          {}
          <div className="container">
            <Sidebar theme={theme} setTheme={setTheme} />
            <Switch>
              <Route exact path="/">
                <Home />
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
              <Route path="/products">
                <QuestionList />
              </Route>

              <Route path="/lessons">
                <LessonList />
              </Route>

              <Route path="/words/:lessonId">
                <WordList />
              </Route>

              <Route path="/word/:wordId">
                <Word />
              </Route>

              <Route path="/lesson/:lessonId">
                <Lesson />
              </Route>
              <Route path="/newWord/:lessonId">
                <NewWord />
              </Route>
              <Route path="/question/:questionId">
                <Question />
              </Route>
              <Route path="/newproduct">
                <NewQuestion />
              </Route>

              <Route path="/newLesson">
                <NewLesson />
              </Route>

              <Route path="/test">
                <InputArray />
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
      </Router>
    </SetPopupContext.Provider>
  );
}

export default App;
