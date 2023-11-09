import React, { Component } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

class Poll extends Component {
  state = {
    polls: [],
  };

  //view all polls
  componentDidMount() {
    axios
      .get("http://localhost:8081/poll/view")
      .then((response) => {
        console.log(response);
        this.setState({ polls: response.data });
      })
      .catch((err) => console.log(err));
  }

  //delete each poll by pollId
  handleDelete = (pollId) => {
    axios
      .delete(`http://localhost:8081/poll/delete/${pollId}`)
      .then((res) => {
        console.log(res);
        //to automatically update after delteing rather than refreshing the page
        const updatedPolls = this.state.polls.filter(
          (pollInfo) => pollInfo.pollId !== pollId
        );
        //updating state: poll with updated polls
        this.setState({ polls: updatedPolls });
      })

      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <Box sx={{ mt: 3, width: "50%", mx: "auto" }} elevation={3}>
          <Button
            component={Link}
            to="/poll/create"
            variant="contained"
            color="secondary"
            sx={{ mb: 2 }}
          >
            CREATE POLL
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "blue" }}>
                <TableRow>
                  <TableCell>PollId</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Answers</TableCell>
                  <TableCell>Created On</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.polls.map((pollInfo) => (
                  <TableRow key={pollInfo.pollId}>
                    <TableCell>{pollInfo.pollId}</TableCell>
                    <TableCell>{pollInfo.question}</TableCell>
                    <TableCell>
                      {pollInfo.answers.join(" , ")}
                      {/*{<ul>
                                    {pollInfo.answers.map((answer) =>{
                                       <li>{answer}</li>
                                    })}
                                </ul>}*/}
                    </TableCell>
                    <TableCell>{pollInfo.createdOn}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => this.handleDelete(pollInfo.pollId)}
                        >
                          DELETE
                        </Button>

                        <Button
                          component={Link}
                          to={`/poll/participate/${pollInfo.pollId}`}
                          variant="contained"
                          color="primary"
                        >
                          Participate
                        </Button>
                        <Button
                          component={Link}
                          to={`/poll/result/${pollInfo.pollId}`}
                          variant="contained"
                          color="primary"
                        >
                          <i class="bi bi-check-square-fill"></i>Result
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    );
  }
}

export default Poll;
