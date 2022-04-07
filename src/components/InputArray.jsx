import { produce } from "immer";
import React, { useState } from "react";
import { Button, Input } from "antd";
// import { generate } from "shortid";

export const InputArray = ({ array, setArray }) => {
  //   const [array, setArray] = useState([{ url: "", id: "" }]);

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => {
          setArray((currentPeople) => [
            ...currentPeople,
            {
              url: "",
              id: "",
            },
          ]);
        }}
        style={{
          color: "white",
          fontFamily: "Helvetica",
          backgroundColor: "#363537",
          padding: ".5rem",
        }}
      >
        Click here to add Add a grammar url for this lesson
      </Button>
      {array.map((p, index) => {
        return (
          <div key={`id-${index}`}>
            <Input
              onChange={(e) => {
                e.preventDefault();
                const url = e.target.value;
                setArray((currentPeople) =>
                  produce(currentPeople, (v) => {
                    v[index].url = url;
                    v[index].id = `id-${index}`;
                  })
                );
              }}
              value={p.url}
              placeholder="Grammar url"
              style={{
                width: "14rem",
                marginTop: ".8rem",
                backgroundColor: "#363537",
                color: "white",
                padding: "1.5rem",
              }}
            />
            {/* <input
              onChange={(e) => {
                const lastName = e.target.value;
                setPeople((currentPeople) =>
                  produce(currentPeople, (v) => {
                    v[index].lastName = lastName;
                  })
                );
              }}
              value={p.lastName}
              placeholder="last name"
            /> */}
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => {
                setArray((currentPeople) =>
                  currentPeople.filter((x) => x.id !== p.id)
                );
              }}
            >
              x
            </Button>
          </div>
        );
      })}
      {/* <div>{JSON.stringify(people, null, 2)}</div> */}
    </div>
  );
};
