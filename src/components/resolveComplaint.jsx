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

const ResolveComplaint = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [stat, setStat] = useState({
    complaintId: "",
    status: "",
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
  useEffect(() => {
    //logic
    console.log(params);
    axios
      .get(`http://localhost:8081/complaint/viewById/${params.id}`)
      .then((res) => {
        console.log(res);
        setStat(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    //axios.put(url, obj)
    event.preventDefault();
    axios
      .put("http://localhost:8081/admin/resolveComplaint", stat)
      .then((res) => {
        console.log(res);
        alert("Updated Complaint status successfully!");
        navigate("/adminComplaint");
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
        className="float-center border p-3 w-50 mx-auto mt-5 row"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center" data-testid="title">
          Update Complaint Status
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
        <div className="mb-3">
          <label
            for="complaintId"
            className="form-label float-start"
            data-testid="Complaint"
          >
            Complaint Id:
          </label>
          <input
            type="text"
            className="form-control"
            id="complaintId"
            value={stat.complaintId}
            disabled
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            // id="status"
            // defaultValue={stat.status}
            value={stat.status}
            name="status"
            onChange={handleChange}
          >
            <option selected data-testid="Status">
              Select Query Status
            </option>
            <option value="QUERY_RAISED" data-testid="QUERY_RAISED">
              QUERY_RAISED
            </option>
            <option value="QUERY_RESOLVED" data-testid="QUERY_RESOLVED">
              QUERY_RESOLVED
            </option>
          </select>
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
            className="btn btn-primary float-start"
            data-testid="Update"
          >
            Update
          </button>
        </div>
      </form>
      {/* </Box> */}
    </div>
  );
};

export default ResolveComplaint;
