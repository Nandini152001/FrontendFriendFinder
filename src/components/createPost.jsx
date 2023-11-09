import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";

const CreatePost = () => {
  const userId = useSelector((state) => state.login.user.userId);
  // const params = useParams();
  const [text, settext] = useState("");

  const handleChange = (event) => {
    // const text = { ...post };
    // text[event.target.name] = event.target.value;
    // console.log(event);
    // console.log(event.target);
    console.log(event.target.name);
    console.log(event.target.value);

    settext(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(text);
    axios
      .post(`http://localhost:8081/posts/add/${userId}`, text)
      .then((res) => {
        console.log(res);
        alert("Added Post Successfully!");
        // navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          mx: "auto",
          width: "35%",
          mt: 5,
          border: 1,
          p: 3,
          borderRadius: "16px",
          // borderColor: "primary.main",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>
          Create New Post
        </Typography>
        <Stack spacing={2}>
          <TextField
            required
            id="outlined-required"
            label="What's on your mind"
            // defaultValue="Post Content"
            value={text}
            name="text"
            onChange={handleChange}
          />
          {/* <TextField
            // required
            id="outlined-required"
            // name="postedOn"
            // type="date"
            // type="datetime-local"
            label="Time of Posting"
            // value={state.post.postedOn}
            value={`${new Date().toLocaleString()}`}
            onChange={handleChange}
          /> */}
          <Button
            variant="contained"
            type="submit"
            // to={`/post/add/${userId}`}
            // component={Link}
            // onChange={handleChange}
          >
            Post
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default CreatePost;
