import React from "react";

export default function SearchByName({ changeHandler }) {
  return (
    <div>
      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Search Products By Name"
          //   value={name}
          onChange={(e) => changeHandler(e.target.value)}
          className="form-control form-control-lg border-dark"
        />
      </div>
    </div>
  );
}
