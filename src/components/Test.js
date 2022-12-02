import React from "react";

const Test = () => {
  const FakeData = [
    {
      id: 99,
      firstName: "Clarette",
      lastName: "Carncross",
      email: "ccarncross2q@go.com",
      gender: "Female",
      birthday: "1985-10-05T05:31:17Z",
      salary: 9033,
      phone: "469-572-7849",
    },
    {
      id: 100,
      firstName: "Torre",
      lastName: "Doppler",
      email: "tdoppler2r@yolasite.com",
      gender: "Male",
      birthday: "1998-05-17T10:20:30Z",
      salary: 6924,
      phone: "766-973-5223",
    },
  ];
  const sorted = [...FakeData].sort((a, b) =>
    a.id.toString() > b.id.toString() ? 1 : -1
  );
  console.log(sorted);
  return <div>Hello</div>;
};

export default Test;
