import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ViewComplaint = () => {
  const userId = useSelector((state) => state.login.user.userId);
  const [comp, setComplaint] = useState({
    complaint: [],
  });
  useEffect(() => {
    //logic
    // console.log(userId);
    axios
      .get(`http://localhost:8081/complaint/viewAllComplaintForUser/${userId}`)
      .then((res) => {
        console.log(res);
        setComplaint(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (complaintId) => {
    axios
      .delete(`http://localhost:8081/complaint/delete/${complaintId}`) //Backticks are used far variable sustitution
      .then((res) => {
        console.log(res);
        const updatedcomps = comp.complaint.filter(
          (comp) => comp.complaintId !== complaintId
        );
        setComplaint({ complaint: updatedcomps });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="float-center border border-dark p-2 rounded w-75 mx-auto mt-5 opacity-75">
      <Box sx={{ mt: 3, width: "80%", mx: "auto" }}>
        <Button
          to="/complaint"
          variant="contained"
          component={Link}
          color="success"
          sx={{ mb: 2 }}
        >
          Add <i class="bi bi-file-earmark-plus-fill display-6"></i>
        </Button>
        <h3 className="text-center mb-2">USER LIST OF ALL COMPLAINTS</h3>
        <TableContainer component={Paper} elevation={16}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Complaint Message</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Complaint Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comp.complaint.map((complaint1) => (
                <TableRow key={complaint1.complaintId}>
                  <TableCell>{complaint1.complaintText}</TableCell>
                  <TableCell>{complaint1.comments}</TableCell>
                  <TableCell>{complaint1.status}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(complaint1.complaintId)}
                      >
                        {/* Delete */}
                        <i class="bi bi-trash"></i>
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
};

export default ViewComplaint;
