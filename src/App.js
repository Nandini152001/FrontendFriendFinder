import "./App.css";
import Nav from "./components/nav";
import Profile from "./components/profile";
import FriendList from "./components/friendList";
import Complaint from "./components/complaint";
import Login from "./components/login";
import Logout from "./components/logout";
import Poll from "./components/poll";
import CreatePoll from "./components/createPoll";
import ParticipatePoll from "./components/participatePoll";
import Register from "./components/register";
import Users from "./components/users";
import FriendRequest from "./components/friendRequest";
import SendRequest from "./components/sendRequest";
import ComplaintUpdate from "./components/complaintUpdate";
import ViewComplaint from "./components/viewComplaint";
import AdminComplaint from "./components/adminComplaint";
import ResolveComplaint from "./components/resolveComplaint";

// import Post from "./components/post-bootstrap";
import Post from "./components/post";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
// import { BrowserRouter } from "react-router-dom";
import CreatePost from "./components/createPost";
import UpdatePost from "./components/updatePost";
import Comment from "./components/comment";
import ReportPost from "./components/reportPost";
import CreateComment from "./components/createComment";
import ReportComment from "./components/reportComment";
import UserControl from "./components/userControl";
import PollResult from "./components/pollResult";
import GetUserPosts from "./components/getUserPosts";

// import Likes from "./components/likes";
// document.body.style.backgroundColor = "#adbf6f8a"

// document.body.style.backgroundPosition = "center";

// document.body.style.backgroundRepeat = "no-repeat";

// document.body.style.backgroundSize = "cover";
document.body.style.backgroundImage =
  "url('https://images.unsplash.com/photo-1634655377962-e6e7b446e7e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80')";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/post" element={<Post />} />
        <Route path="/post/add/:id" element={<CreatePost />} />
        <Route path="/post/update/:id" element={<UpdatePost />} />
        <Route path="/post/comment/:id" element={<Comment />} />
        {/* <Route path="/post/comment" element={<CreateComment />} /> */}
        <Route path="/post/createComment/:id" element={<CreateComment />} />
        {/* <Route path="/post/like/:id" element={<Likes />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/poll" element={<Poll />} />
        <Route path="/poll/create" element={<CreatePoll />} />
        <Route path="/poll/participate/:id" element={<ParticipatePoll />} />
        <Route path="/users" element={<Users />} />
        <Route path="/sendRequest/:toId" element={<SendRequest />} />
        <Route path="/friendRequest/:id" element={<FriendRequest />} />
        <Route path="/friendList/:id" element={<FriendList />} />
        <Route path="/complaintUpdate" element={<ComplaintUpdate />} />
        <Route path="/viewComplaint" element={<ViewComplaint />} />
        <Route path="/adminComplaint" element={<AdminComplaint />} />
        <Route path="/resolveComplaint/:id" element={<ResolveComplaint />} />
        <Route path="/reportPost/:id" element={<ReportPost />} />
        <Route path="/reportComment/:id" element={<ReportComment />} />
        <Route path="/userControl" element={<UserControl />} />
        <Route path="/poll/result/:id" element={<PollResult />} />
        <Route path="/post/view/:id" element={<GetUserPosts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
