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
import { useParams } from "react-router-dom";
import Loading from "./Loading/Loading";

export default function WordList() {
  const [words, setWords] = useState([]);
  const handleDelete = async (id) => {
    setWords(words.filter((item) => item._id !== id));
    await callAxios("delete", `words/${id}`);
  };
  const [isLoading, setIsLoading] = useState(false);

  const { lessonId } = useParams();
  const setFunctionCallBack = ({ docs }) =>
    docs.map((doc, index) => ({
      ...doc,
      id: `id-${index + 1}`,
      // words: [],
    }));

  useAxios(
    "get",
    `words?lessonId=${lessonId}`,
    setWords,
    setFunctionCallBack,
    null,
    setIsLoading
  );

  const history = useHistory();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "character",
      headerName: "Character",
      width: 150,
    },
    { field: "pinyin", headerName: "Pinyin", width: 150 },
    {
      field: "englishTranslation",
      headerName: "English",
      width: 150,
    },
    {
      field: "sentence",
      headerName: "Sentence",
      width: 140,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/word/" + params.row._id}>
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
        <Link to={`/newWord/${lessonId}`}>
          <Button className="btn homebtn getstarted">CREATE</Button>
        </Link>
      </div>
      <div className="data-grid-container">
        <DataGrid
          className="data-grid-table"
          rows={words}
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
