import "./newQuestion.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AppUpload from "../../upload/AppUpload";
import { callAxios, useAxios } from "../../hooks/axiosUtils";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function Question({ update }) {
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
  const { questionId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("here");
      callAxios("put", `questions/${questionId}`, null, null, {
        ...input,
        incorrect_answers: inCorrect,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [lessons, setLessons] = useState([]);

  useAxios("get", "lessons", setLessons, (data) =>
    data.docs.map(({ title }) => title)
  );

  const [isLoading, setIsLoading] = useState(false);

  useAxios(
    "get",
    `questions/${questionId}`,
    setInput,
    (data) => data.doc,
    null,
    setIsLoading
  );

  const readerOptions = (options, selectedValue) =>
    options.map((option) => (
      <option value={option} selected={options === selectedValue}>
        {option}
      </option>
    ));

  console.log({ input });

  useEffect(() => {
    setInCorrect(
      input.incorrect_answers ? input.incorrect_answers : ["", "", ""]
    );
  }, [input]);

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
    <div className="newProduct">
      <h1 className="addProductTitle">New Question</h1>
      {input.category === "Writing" ? (
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Category</label>
            <select
              name="inStock"
              id="idStock"
              value={input.category}
              onChange={categoryChangeHandler}
            >
              <option value="Reading">Reading</option>
              <option value="Writing">Writing</option>
              <option value="Listing">Listing</option>
              {/* {readerOptions(["Reading", "Writing", "Listing"], input.category)} */}
            </select>

            <label>Question Type</label>
            <select name="inStock" id="idStock" value={input.type}>
              {categoryQuestionType[input.category].map((value) => (
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
            <label>Category</label>
            <select
              name="inStock"
              id="idStock"
              onChange={categoryChangeHandler}
              value={input.category}
            >
              <option value="Reading">Reading</option>
              <option value="Writing">Writing</option>
              <option value="Listing">Listing</option>
            </select>

            <label>Question Type</label>
            <select
              name="inStock"
              id="idStock"
              value={input.type}
              onChange={(e) => setInput({ ...input, type: e.target.value })}
            >
              {categoryQuestionType[input.category].map((value) => (
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

            {input.category === "Listing" && input.type === "True and False" ? (
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
                <label>InCorrect heer </label>
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
                    // setInput({
                    //   ...input,
                    //   incorrect_answers: input.incorrect_answer.map(
                    //     (value, index) => (index === 0 ? e.target.value : value)
                    //   ),
                    // });
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

            {input.category === "Listing" && (
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

      {input.category === "Listing" && (
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
