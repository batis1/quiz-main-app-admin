import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "antd";
import { callAxios, useAxios } from "../../hooks/axiosUtils";
import Loading from "./../../components/Loading/Loading";

export default function UserList() {
  const [data, setData] = useState(userRows);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setUsers(users.filter((item) => item._id !== id));
    callAxios("delete", `user/${id}`);
  };

  const setFunctionCallBack = ({ docs }) =>
    docs.map((doc, index) => ({ ...doc, id: `user-id-${index + 1}` }));

  useAxios("get", "user", setUsers, setFunctionCallBack, null, setIsLoading);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
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
    <div className="userList">
      <div className="question-add">
        {/* <h3>Questions</h3> */}
        <Link to="/newproduct">
          {/* <Button className="btn homebtn getstarted">A</Button> */}
        </Link>
      </div>
      <div className="data-grid-container">
        <DataGrid
          className="data-grid-table"
          rows={users}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </div>
  );
}
