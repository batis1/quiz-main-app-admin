import "../pages/questionList/questionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { callAxios, useAxios } from "../hooks/axiosUtils";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "./Loading/Loading";

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [isWordsLoaded, setIsWordsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    setLessons(lessons.filter((item) => item._id !== id));
    await callAxios("delete", `lessons/${id}`);
  };

  const setFunctionCallBack = ({ docs }) =>
    docs.map((doc, index) => ({
      ...doc,
      id: `id-${index + 1}`,
      // words: [],
    }));

  useAxios(
    "get",
    "lessons?withWords=true",
    setLessons,
    setFunctionCallBack,
    null,
    setIsLoading
  );

  // const setFunctionCallBackWords =
  //   ({ docs }) =>
  //   (oldLessons) => {
  //     console.log({ oldLessons, docs, lessonId: docs[0]?.lessonId });
  //     let newLessons = oldLessons;
  //     if (docs[0]?.lessonId) {
  //       newLessons = oldLessons.map((lesson) =>
  //         lesson._id === docs[0]?.lessonId ? { ...lesson, words: docs } : lesson
  //       );
  //     }
  //     console.log({ newLessons });
  //     // oldLessons.includes(docs[0]?.lessonId).words = docs;
  //     return [...newLessons];
  //   };
  // // docs.map((doc, index) => ({
  // //   ...doc,
  // // }));
  // useEffect(() => {
  //   (async () => {
  //     if (!isWordsLoaded && lessons.length > 0) {
  //       for (let index = 0; index < lessons.length; index++) {
  //         const { _id } = lessons[index];

  //         callAxios(
  //           "get",
  //           `words?lessonId=${_id}`,
  //           setLessons,
  //           setFunctionCallBackWords
  //         );
  //         console.log({ _id });
  //       }
  //       setIsWordsLoaded(true);
  //     }
  //   })();
  // }, [lessons]);

  const history = useHistory();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {/* {params.row.question.split(" ").slice(0, 4).join(" ")} */}
            {params.row.title}
          </div>
        );
      },
    },
    { field: "iconName", headerName: "Icon", width: 200 },
    {
      field: "words",
      headerName: "Words",
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={`words/${params.row._id}`}>
            <button className="productListEdit">
              {`${params.row.words.length} ${
                params.row.words.length > 1 ? " words" : " word"
              }`}
            </button>
          </Link>
          // <span
          //   style={{ cursor: "pointer" }}
          //   onClick={() => history.push(`words/${params.row._id}}`)}
          // >
          //   {params.row.words.length}
          //   <span style={{ marginLeft: "10px" }}>
          //     {"  "}
          //     {` ${params.row.words.length > 1 ? " words" : " word"}`}
          //   </span>
          // </span>
        );
      },
    },
    // {
    //   field: "type",
    //   headerName: "Type",
    //   width: 120,
    // },
    // {
    //   field: "difficulty",
    //   headerName: "Difficulty",
    //   width: 160,
    // },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/lesson/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>

            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
            {/* <Link to={"/newproduct/"}>
              <button className="productListCreate">Create</button>
            </Link> */}
          </>
        );
      },
    },
  ];

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
    <div className="productList">
      <div className="question-add">
        {/* <h3>Questions</h3> */}
        <Link to="/newLesson">
          <Button className="btn homebtn getstarted">CREATE</Button>
        </Link>
      </div>
      <div className="data-grid-container">
        <DataGrid
          className="data-grid-table"
          rows={lessons}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />

        {/* <h3>listening</h3>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
      <h3>Writing</h3>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      /> */}
      </div>
    </div>
  );
}
