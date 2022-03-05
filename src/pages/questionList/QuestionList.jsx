import "./questionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { callAxios, useAxios } from "../../hooks/axiosUtils";
import apiList from "../../lib/apiList";
export default function QuestionList() {
  const [data, setData] = useState(productRows);

  const [questions, setQuestions] = useState([]);
  const handleDelete = async (id) => {
    setQuestions(questions.filter((item) => item.id !== id));
    try {
      await axios.delete(`${apiList.questions}/${id}`);
      console.log("question deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const setFunctionCallBack = (data) =>
    data.map((doc) => ({
      id: doc._id,
      ...doc,
    }));

  useAxios("get", "questions", setQuestions, setFunctionCallBack);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Question",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {params.row?.question?.split(" ").slice(0, 4).join(" ")}
          </div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 200 },
    {
      field: "type",
      headerName: "Type",
      width: 120,
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      width: 160,
    },
    {
      field: "level",
      headerName: "Level",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/question/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>

            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
            {/* <Link to={"/newproduct/"}>
              <button className="productListCreate">Create</button>
            </Link> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="question-add">
        {/* <h3>Questions</h3> */}
        <Link to="/newproduct">
          <Button className="btn homebtn getstarted">CREATE</Button>
        </Link>
      </div>
      <div className="data-grid-container">
        <DataGrid
          className="data-grid-table"
          rows={questions}
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
