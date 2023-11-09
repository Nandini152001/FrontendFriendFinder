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
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
const Tabs = () => {
  const [comp, setComplaint] = useState({
    complaint: [],
  });

  useEffect(() => {
    //logic
    // console.log(userId);
    axios
      .get(`http://localhost:8081/admin/complaint/findAll`)
      .then((res) => {
        console.log(res);
        setComplaint({ complaint: res.data });
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
    <div>
      <div class="w-75 mt-3 mx-auto border border-dark p-2 rounded">
        <h3 className="text-center mt-3">LIST OF ALL COMPLAINTS</h3>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              General Complaint
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Post Reported
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Comment Reported
            </button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabindex="0"
          >
            <div className="float-center mx-auto">
              <Box
                className="opacity-75"
                sx={{ /*mt: 1,*/ /*width: "80%",*/ mx: "auto" }}
              >
                <TableContainer component={Paper} elevation={24}>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    elevation={24}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Complaint Id</TableCell>
                        <TableCell>Complaint Message</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Complaint Status</TableCell>
                        <TableCell>Update Status</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {comp.complaint
                        .filter(
                          (complaint) =>
                            complaint.post == null && complaint.comment == null
                        )
                        .map((complaint1) => (
                          <TableRow key={complaint1.complaintId}>
                            <TableCell>{complaint1.complaintId}</TableCell>
                            <TableCell>{complaint1.complaintText}</TableCell>
                            <TableCell>{complaint1.comments}</TableCell>
                            <TableCell>{complaint1.status}</TableCell>
                            {/* <TableCell>
                            {complaint1.post != null && complaint1.post.postId}
                          </TableCell>
                          <TableCell>
                            {complaint1.comment != null &&
                              complaint1.comment.commentId}
                          </TableCell> */}
                            <TableCell>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  to={`/resolveComplaint/${complaint1.complaintId}`}
                                  component={Link}
                                  variant="outlined"
                                >
                                  {/* Update */}
                                  <i class="bi bi-arrow-clockwise"></i>
                                </Button>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  Button
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    handleDelete(complaint1.complaintId)
                                  }
                                >
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
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabindex="0"
          >
            <div className="float-center mx-auto">
              <Box
                className="opacity-75"
                sx={{ /*mt: 1,*/ /*width: "80%",*/ mx: "auto" }}
              >
                <TableContainer component={Paper} elevation={24}>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    elevation={24}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Complaint Id</TableCell>
                        <TableCell>Complaint Message</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Complaint Status</TableCell>
                        <TableCell>Post Id</TableCell>
                        <TableCell>Update Status</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {comp.complaint
                        .filter((complaint) => complaint.post != null)
                        .map((complaint1) => (
                          <TableRow key={complaint1.complaintId}>
                            <TableCell>{complaint1.complaintId}</TableCell>
                            <TableCell>{complaint1.complaintText}</TableCell>
                            <TableCell>{complaint1.comments}</TableCell>
                            <TableCell>{complaint1.status}</TableCell>
                            <TableCell>
                              {complaint1.post != null &&
                                complaint1.post.postId}
                            </TableCell>
                            {/* <TableCell>
                            {complaint1.comment != null &&
                              complaint1.comment.commentId}
                          </TableCell> */}
                            <TableCell>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  to={`/resolveComplaint/${complaint1.complaintId}`}
                                  component={Link}
                                  variant="outlined"
                                >
                                  {/* Update */}
                                  <i class="bi bi-arrow-clockwise"></i>
                                </Button>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  Button
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    handleDelete(complaint1.complaintId)
                                  }
                                >
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
          </div>
          <div
            class="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabindex="0"
          >
            <div className="float-center mx-auto">
              <Box
                className="opacity-75"
                sx={{ /*mt: 1,*/ /*width: "80%",*/ mx: "auto" }}
              >
                <TableContainer component={Paper} elevation={24}>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    elevation={24}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Complaint Id</TableCell>
                        <TableCell>Complaint Message</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Complaint Status</TableCell>
                        <TableCell>Comment Id</TableCell>
                        <TableCell>Update Status</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {comp.complaint
                        .filter((complaint) => complaint.comment != null)
                        .map((complaint1) => (
                          <TableRow key={complaint1.complaintId}>
                            <TableCell>{complaint1.complaintId}</TableCell>
                            <TableCell>{complaint1.complaintText}</TableCell>
                            <TableCell>{complaint1.comments}</TableCell>
                            <TableCell>{complaint1.status}</TableCell>
                            {/* <TableCell>
                            {complaint1.post != null && complaint1.post.postId}
                          </TableCell> */}
                            <TableCell>
                              {complaint1.comment != null &&
                                complaint1.comment.commentId}
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  to={`/resolveComplaint/${complaint1.complaintId}`}
                                  component={Link}
                                  variant="outlined"
                                >
                                  {/* Update */}
                                  <i class="bi bi-arrow-clockwise"></i>
                                </Button>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  Button
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    handleDelete(complaint1.complaintId)
                                  }
                                >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
