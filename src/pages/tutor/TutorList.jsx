import "./questionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { callAxios, useAxios } from "../../hooks/axiosUtils";
import apiList, { server } from "../../lib/apiList";
import Loading from "../../components/Loading/Loading";
import { SetPopupContext } from "../../App";

export default function TutorList() {
  const [data, setData] = useState(productRows);

  const [questions, setQuestions] = useState([]);
  const setPopup = useContext(SetPopupContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiList.tutor}/${id}`);
      setPopup({
        open: true,
        severity: "success",
        message: `tutor deleted successfully`,
      });
      setQuestions(questions.filter((item) => item._id !== id));
      console.log("tutor deleted successfully");
    } catch (error) {
      console.log(error);
      setPopup({
        open: true,
        severity: "error",
        message: `there were an error while deleting the tutor`,
      });
    }
  };

  const setFunctionCallBack = ({ docs }) =>
    docs.map((doc, index) => ({
      id: `id-${index}`,
      ...doc.userId,
      ...doc,
    }));
  const [isLoading, setIsLoading] = useState(false);

  useAxios(
    "get",
    "tutors",
    setQuestions,
    setFunctionCallBack,
    null,
    setIsLoading
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Tutor Name",
      width: 120,
    },
    {
      field: "imageUrl",
      headerName: "Tutor Avatar",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={`${server}/${params.row.imageUrl}`}
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "hskLevel",
      headerName: "HSK Level",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "educationalBackground",
      headerName: "Educational background",
      width: 200,
    },
    {
      field: "teachingPeriod",
      headerName: "Teaching period",
      width: 160,
    },
    {
      field: "teachingTime",
      headerName: "Teaching time",
      width: 160,
    },

    {
      field: "moreInfo",
      headerName: "More Info",
      width: 160,
    },

    {
      field: "zoomRoomID",
      headerName: "Zoom's room ID",
      width: 160,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/tutor/" + params.row._id}>
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
        <Link to="/newquestion">
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
