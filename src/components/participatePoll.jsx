import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ParticipatePoll = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [polls, setPolls] = useState([]);
  const [poll, setPoll] = useState({});

  //get userId
  const userData = JSON.parse(localStorage.getItem("User"));
  const id = userData.userId;
  console.log(id);
  const params = useParams();

  useEffect(() => {
    function xyz() {
      axios
        .get(`http://localhost:8081/poll/view/${params.id}`)
        .then((response) => {
          // console.log(response);
          setPoll(response.data);
          setPolls(response.data.answers);
        })
        .catch((err) => console.log(err));
    }
    xyz();
  }, []);

  const handleOptionChange = (changeEvent) => {
    setSelectedOption(changeEvent.target.value);
  };
  const handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();

    let opt = { userId: id, pollId: poll.pollId, option: selectedOption };

    axios
      .post("http://localhost:8081/poll/participate", opt)
      .then((res) => {
        // console.log(res);
        navigate("/poll");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-50 mx-auto p-5 border border-dark mt-3">
      <h3 className="text-center">Participate Poll</h3>
      {/* <form className="p-3" onSubmit={handleSubmit}> */}
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          User ID
        </label>
        <h3>
          <p>{id}</p>
        </h3>
      </div>

      <div className="mb-3">
        <label htmlFor="pollId" className="form-label">
          Poll ID
        </label>
        {/*passing the pollId as user selects a particular pollID*/}
        <h3>
          <p>{poll.pollId}</p>
        </h3>
      </div>
      <div className="mb-3">
        <form onSubmit={handleFormSubmit}>
          <div className="radio">
            {polls.map((option) => (
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            ))}
          </div>

          <button className="btn btn-primary float-end" type="submit">
            Save
          </button>
        </form>
      </div>
      {/* <button type="submit" className="btn btn-primary float-end">Submit</button>
      </form> */}
    </div>
  );
};

export default ParticipatePoll;
