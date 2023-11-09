import React, { Component } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

class CreatePoll extends Component {
  state = {
    polls: {
      question: "",
      answers: "",
      createdOn: "",
    },
  };
  handleChange = (event) => {
    //copy state poll object to newPoll using spread operator
    const newPoll = { ...this.state.polls };
    console.log(event.target.name);
    console.log(event.target.value);
    newPoll[event.target.name] = event.target.value;

    this.setState({ polls: newPoll });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //state poll object
    console.log(this.state.polls);

    console.log(this.state.polls.answers.split(","));

    const x = this.state.polls.answers.split(",");
    const poll = {
      question: this.state.polls.question,
      answers: [...x],
      createdOn: this.state.polls.createdOn,
    };

    console.log(poll);

    axios
      .post("http://localhost:8081/poll/create", poll)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Box
          component="form"
          sx={{
            width: "35%",
            mx: "auto",
            mt: 5,
            border: 1,
            borderColor: "primary.main",
            p: 3,
          }}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <Typography
            variant="h4"
            style={{ textAlign: "center" }}
            sx={{ mb: 3 }}
            gutterBottom
          >
            NEW POLL
          </Typography>
          <Stack spacing={2}>
            <TextField
              required
              id="question"
              label="Question"
              type="text"
              value={this.state.polls.question}
              name="question"
              onChange={this.handleChange}
            />

            <TextField
              required
              id="answers"
              label="Answers"
              type="text"
              value={this.state.polls.answers}
              name="answers"
              onChange={this.handleChange}
            />

            <TextField
              required
              id="date"
              type="date"
              value={this.state.polls.createdOn}
              name="createdOn"
              onChange={this.handleChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Stack>
        </Box>
      </div>
    );
  }
}

export default CreatePoll;
