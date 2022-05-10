import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import axios from "axios";

const baseURL = "http://localhost:3001/api/user/register";

export default function Register() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      username: formData.get("username"),
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(data)
    await axios
      .post(baseURL, 
        data
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        margin: "0 auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormLabel>Registration Form</FormLabel>
        <TextField
          id="username"
          name="username"
          type="text"
          label="Username"
          required={true}
        />
        <TextField
          id="firstname"
          name="firstname"
          type="text"
          label="First name"
          required={true}
        />
        <TextField
          id="lastname"
          name="lastname"
          type="text"
          label="Last name"
          required={true}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="E-mail"
          required={true}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          required={true}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
}
