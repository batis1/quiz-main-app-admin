import { produce } from "immer";
import React, { useState } from "react";
// import { generate } from "shortid";

export const InputArray = ({ array, setArray }) => {
  //   const [array, setArray] = useState([{ url: "", id: "" }]);

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={() => {
          setArray((currentPeople) => [
            ...currentPeople,
            {
              url: "",
              id: "",
            },
          ]);
        }}
      >
        add new grammar url
      </button>
      {array.map((p, index) => {
        return (
          <div key={`id-${index}`}>
            <input
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
              placeholder="grammar url"
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
            <button
              onClick={() => {
                setArray((currentPeople) =>
                  currentPeople.filter((x) => x.id !== p.id)
                );
              }}
            >
              x
            </button>
          </div>
        );
      })}
      {/* <div>{JSON.stringify(people, null, 2)}</div> */}
    </div>
  );
};
