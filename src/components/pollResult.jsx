import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const PollResult = () => {
  const navigate = useNavigate();
  const [resId, setResId] = useState({
    idRes: {},
  });
  const [rlt, setRlt] = useState({
    result: [],
  });

  //get userId
  const userData = JSON.parse(localStorage.getItem("User"));
  const id = userData.userId;
  console.log(id);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/poll/result/${params.id}`) //http://localhost:8081/poll/result/11
      .then((response) => {
        // console.log(response);
        setResId({ idRes: params.id });
        setRlt({ result: response.data });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="float-center border w-75 mx-auto mt-5 opacity-75">
      <h3 className="text-center mt-3">Poll Result</h3>
      <Box className="opacity-90" sx={{ mt: 3, width: "80%", mx: "auto" }}>
        <TableContainer component={Paper} elevation={24}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            elevation={24}
          >
            <TableHead>
              <TableRow>
                <TableCell>Option</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rlt.result.map((result1) => (
                <TableRow>
                  <TableCell>{result1.selected_option}</TableCell>
                  <TableCell>{result1.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default PollResult;
