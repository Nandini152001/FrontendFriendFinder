import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReportComment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [stat, setStat] = useState({
    complaintText: "",
    comments: "",
  });
  const handleChange = (event) => {
    const updatedStat = { ...stat };
    console.log(event.target.name);
    console.log(event.target.value);
    updatedStat[event.target.name] = event.target.value;
    setStat(updatedStat);
  };
  //   const [comp, setComp] = useState({
  //     complaintId: "",
  //     status: "",
  //   });

  const handleSubmit = (event) => {
    //axios.put(url, obj)
    event.preventDefault();
    axios
      .post(`http://localhost:8081/complaint/reportComment/${params.id}`, stat)
      .then((res) => {
        console.log(res);
        alert("Comment Reported successfully!");
        navigate("/post");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* <Box
        className="border p-5 w-50 mx-auto mt-3"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      > */}

      <form
        className="float-center border border-dark p-2 rounded w-50 mx-auto mt-5 row"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center" data-testid="title">
          REPORT COMMENT
        </h3>
        {/* <TextField
          className="mt-3"
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={stat.complaintId}
          InputProps={{
            readOnly: true,
          }}
          handleChange={handleChange}
        /> */}
        <div className="row mb-3 mt-2">
          <label
            for="comp_msg"
            className="col-sm-2 col-form-label"
            data-testid="Message"
          >
            Message
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="complaintText"
              // value={user.comp_msg}
              name="complaintText"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3 mt-2">
          <label
            for="comp_msg"
            className="col-sm-2 col-form-label"
            data-testid="Comment"
          >
            Comment
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="comments"
              // value={user.comp_msg}
              name="comments"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* <FormControl className="FormControl">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue={stat.status}
            id="status"
          >
            <FormControlLabel
              control={<Radio />}
              label="Query Rsised"
              name="option"
              value={stat.option}
              handleChange={handleChange}
            />
            <FormControlLabel
              control={<Radio />}
              label="Query Resolved"
              name="option"
              value={stat.option}
              handleChange={handleChange}
            />
          </RadioGroup>
        </FormControl> */}
        <div>
          <button
            type="submit"
            className="btn btn-primary float-end"
            data-testid="SUBMIT"
          >
            SUBMIT
          </button>
        </div>
      </form>
      {/* </Box> */}
    </div>
  );
};

export default ReportComment;
