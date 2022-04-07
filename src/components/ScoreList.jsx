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

export default function ScoreList() {
  const [scores, setScores] = useState([]);
  //   const handleDelete = async (id) => {
  //     setScores(scores.filter((item) => item._id !== id));
  //     await callAxios("delete", `words/${id}`);
  //   };
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();
  const setFunctionCallBack = ({ docs }) =>
    docs.map((doc, index) => ({
      ...doc,
      id: `id-${index + 1}`,
      // words: [],
    }));

  useAxios(
    "get",
    `score/${userId}?isAdmin=true`,
    setScores,
    setFunctionCallBack,
    null,
    setIsLoading
  );

  const history = useHistory();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 150,
    },
    {
      field: "score",
      headerName: "Score",
      width: 150,
      renderCell: (params) => (
        <div>{params.row.score ? params.row.score : 0}</div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        // debugger;

        return <div>{`${new Date(params.row.date).toLocaleString()}`}</div>;
      },
    },

    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {/* <Link to={"/word/" + params.row._id}>
    //           <button className="productListEdit">Edit</button>
    //         </Link> */}

    //         {/* <DeleteOutline
    //           className="productListDelete"
    //           onClick={() => handleDelete(params.row._id)}
    //         /> */}
    //         {/* <Link to={"/newproduct/"}>
    //           <button className="productListCreate">Create</button>
    //         </Link> */}
    //       </>
    //     );
    //   },
    // },
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
        {/* <Link to={`/newWord/${userId}`}>
          <Button className="btn homebtn getstarted">CREATE</Button>
        </Link> */}
      </div>
      <div className="data-grid-container">
        <DataGrid
          className="data-grid-table"
          rows={scores}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </div>
  );
}
