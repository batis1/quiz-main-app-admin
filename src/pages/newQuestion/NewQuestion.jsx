import "./newQuestion.css";
import { useState } from "react";
import axios from "axios";
import AppUpload from "../../upload/AppUpload";
import { useAxios } from "../../hooks/axiosUtils";
import apiList from "../../lib/apiList";

export default function NewQuestion({ update }) {
  const categoryQuestionType = {
    Reading: ["Multiple 4"],
    Listing: ["True and False", "Multiple 4"],
    Writing: ["question order"],
  };

  const [category, setCategory] = useState("Reading");

  const [input, setInput] = useState({
    category: "Reading",
    type: "Multiple 4",
    difficulty: "easy",
    level: "select level",
    popupDescription: { pinyin: "", translation: "" },
  });

  const [inCorrect, setInCorrect] = useState(["", "", ""]);

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);

    setInput({
      ...input,
      category: e.target.value,
      type: categoryQuestionType[e.target.value][0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("here");
    try {
      const { data } = await axios.post(apiList.questions, {
        ...input,
        incorrect_answers: inCorrect,
      });
      console.log(data);
      setInput((currentData) => ({
        // category: "Reading",
        // type: "Multiple 4",
        ...currentData,
        difficulty: "easy",
        question: "",
        level: "select level",
        correct_answer: "",
        audioDescription: "",
        popupDescription: { pinyin: "", translation: "" },
      }));
      setInCorrect(["", "", ""]);
    } catch (error) {
      console.log(error);
    }
  };

  const [lessons, setLessons] = useState([]);

  useAxios("get", "lessons", setLessons, (data) =>
    data.docs.map(({ title }) => title)
  );

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Question</h1>
      {category === "Writing" ? (
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Category</label>
            <select
              name="inStock"
              id="idStock"
              onChange={categoryChangeHandler}
            >
              <option value="Reading">Reading</option>
              <option value="Writing">Writing</option>
              <option value="Listing">Listing</option>
            </select>

            <label>Question Type</label>
            <select name="inStock" id="idStock">
              {categoryQuestionType[category].map((value) => (
                <option
                  value={value}
                  onChange={(e) => setInput({ ...input, type: e.target.value })}
                >
                  {value}
                </option>
              ))}
            </select>
            <label>Question</label>
            <input
              type="text"
              value={input.question}
              placeholder="Write Question"
              onChange={(e) => setInput({ ...input, question: e.target.value })}
            />
            <label>Correct</label>
            <input
              type="text"
              value={input.correct_answer}
              placeholder="Write correct answer"
              onChange={(e) =>
                setInput({ ...input, correct_answer: e.target.value })
              }
            />

            <label>Difficulty</label>
            <select
              name="inStock"
              id="idStock"
              value={input.difficulty}
              onChange={(e) =>
                setInput({ ...input, difficulty: e.target.value })
              }
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <label>lesson title</label>
            <select
              name="inStock"
              id="idStock"
              value={input.level}
              defaultValue="select level"
              onChange={(e) => setInput({ ...input, level: e.target.value })}
            >
              <option value="">select level</option>

              {lessons.map((title) => (
                <option value={title}>{title}</option>
              ))}
            </select>
          </div>
        </form>
      ) : (
        <form className="addProductForm">
          <div className="addProductItem">
            {/* <label>Image</label>
        <input type="file" id="file" />
      </div>
      <div className="addProductItem">
        <label>Name</label>
        <input type="text" placeholder="Apple Airpods" />
      </div>
      <div className="addProductItem">
        <label>Stock</label>
        <input type="text" placeholder="123" />
      </div>
      <div className="addProductItem">
        <label>Active</label> */}
            {/* <select name="active" id="active">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select> */}
            <label>Category</label>
            <select
              name="inStock"
              id="idStock"
              onChange={categoryChangeHandler}
            >
              <option value="Reading">Reading</option>
              <option value="Writing">Writing</option>
              <option value="Listing">Listing</option>
            </select>

            <label>Question Type</label>
            <select
              name="inStock"
              id="idStock"
              onChange={(e) => setInput({ ...input, type: e.target.value })}
            >
              {categoryQuestionType[category].map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
            <label>Question </label>
            <input
              type="text"
              placeholder="Write Question"
              value={input.question}
              style={{ width: "300px", height: "120px" }}
              onChange={(e) => setInput({ ...input, question: e.target.value })}
            />

            <label>Difficulty</label>
            <select
              name="inStock"
              id="idStock"
              value={input.difficulty}
              onChange={(e) =>
                setInput({ ...input, difficulty: e.target.value })
              }
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <label>lesson title</label>
            <select
              name="inStock"
              id="idStock"
              value={input.level}
              defaultValue="select level"
              onChange={(e) => setInput({ ...input, level: e.target.value })}
            >
              <option value="">select level</option>

              {lessons.map((title) => (
                <option value={title}>{title}</option>
              ))}
            </select>

            {category === "Listing" && input.type === "True and False" ? (
              <>
                <label>Correct</label>
                <select
                  name="inStock"
                  id="idStock"
                  value={input.difficulty}
                  onChange={(e) =>
                    setInput({ ...input, difficulty: e.target.value })
                  }
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </>
            ) : (
              <>
                <label>Correct </label>
                <input
                  type="text"
                  placeholder="Write A Question"
                  value={input.correct_answer}
                  onChange={(e) =>
                    setInput({ ...input, correct_answer: e.target.value })
                  }
                />
                <label>InCorrect </label>
                <input
                  type="text"
                  placeholder="Write Question"
                  value={inCorrect[0]}
                  onChange={(e) => {
                    setInCorrect(
                      inCorrect.map((value, index) =>
                        index === 0 ? e.target.value : value
                      )
                    );
                  }}
                />
                <input
                  type="text"
                  value={inCorrect[1]}
                  placeholder="Write Question"
                  onChange={(e) => {
                    setInCorrect(
                      inCorrect.map((value, index) =>
                        index === 1 ? e.target.value : value
                      )
                    );
                  }}
                />
                <input
                  type="text"
                  placeholder="Write Question"
                  value={inCorrect[2]}
                  onChange={(e) => {
                    setInCorrect(
                      inCorrect.map((value, index) =>
                        index === 2 ? e.target.value : value
                      )
                    );
                  }}
                />
              </>
            )}

            {category === "Listing" && (
              <>
                <label>audio Description</label>
                <input
                  type="text"
                  placeholder="Write A Question"
                  value={input.audioDescription}
                  onChange={(e) =>
                    setInput({ ...input, audioDescription: e.target.value })
                  }
                />
                <label>pinyin Description</label>
                <input
                  type="text"
                  placeholder="Write A Question"
                  value={input.popupDescription.pinyin}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      popupDescription: {
                        ...input.popupDescription,
                        pinyin: e.target.value,
                      },
                    })
                  }
                />
                <label>translation Description</label>
                <input
                  type="text"
                  placeholder="Write A Question"
                  value={input.popupDescription.translation}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      popupDescription: {
                        ...input.popupDescription,
                        translation: e.target.value,
                      },
                    })
                  }
                />
              </>
            )}
          </div>
          {/* <button className="productButton" onClick={handleSubmit}> */}
        </form>
      )}

      {category === "Listing" && (
        <>
          <label>u</label>
          <AppUpload setInput={setInput} input={input} />
        </>
      )}
      <button className="productButton" onClick={handleSubmit}>
        Create here
      </button>
    </div>
  );
}
