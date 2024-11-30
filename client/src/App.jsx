import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { nanoid } from "nanoid";
import "./App.css";
import axios from "axios";
import MainPage from "../pages/MainPage";
import Post from "../pages/Post";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import Sources from "../pages/Sources";
import Documentation from "../pages/Documentation";


function App() {

  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [renderedPage, setRenderedPage] = useState("Home");

  const [currentUser, setCurrentUser] = useState("");

  const [pageButtons, setPageButtons] = useState([]);

  const [statusMessage, setStatusMessage] = useState("");

  

  useEffect(() => {
    getRecentPosts();
  }, []);
  
  useEffect(() => {
    setDisplayedPosts(posts.slice((currentPage-1) * 9, currentPage * 9));
  }, [posts, renderedPage, currentPage]);

  useEffect(() => {

    let numberOfPages = Math.ceil(posts.length / 9);

    if(numberOfPages !== pageButtons.length){

      const newPageButtons = [];
      for(let i = 1; i <= numberOfPages; i++){
        newPageButtons.push({ id: nanoid(), page: i })
      }

      setPageButtons(newPageButtons);
    }
  }, [posts]);

  function getRecentPosts(){
    axios
      .get('http://localhost:5001/userposts')
      .then((response) => {
        setPosts(response.data)
        setRenderedPage("Page");
      })
      .catch((error) => console.error(error));
  }
  
  function getPopularPosts(){
    axios
      .get(`http://localhost:5001/userposts/posts/popular`)
      .then((response) => {
        setPosts(response.data);
        setRenderedPage("Page");
      })
      .catch((error) => console.error(error));
  }

  function getCurrentUserPosts(){
    axios
      .get(`http://localhost:5001/userposts/username/${currentUser}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error(error));
  }

  function addPost(username, description){
    axios
      .post('http://localhost:5001/userposts', { 
        username: username,
        description: description 
      })
      .then((response) => setPosts([...posts, response.data]))
      .catch((error) => console.error(error));
  }

  function deletePost(userPostId){
    axios
      .delete(`http://localhost:5001/userposts/${userPostId}`, {
        username: currentUser
      })
      .then((response) => {
        const filteredPosts = posts.filter(post => post._id !== userPostId);
        setPosts(filteredPosts)
      })
      .catch((error) => console.error(error));
  }

  function signUp(username, password) {
    axios
      .post('http://localhost:5001/registeredusers/signup', { 
        username: username,
        password: password
      })
      .then((response) => {
        console.log(response.status);
        setStatusMessage("User successfully registered!");
      })
      .catch((error) => {
        console.error(error);
        setStatusMessage("Username is taken, please try another one.");
      });
  }


  function logIn(username, password) {
    axios
      .post('http://localhost:5001/registeredusers/login', { 
        username: username,
        password: password
      })
      .then((response) => {
        setCurrentUser(response.data.username);
        setStatusMessage("Login successful!");
        return true;
      })
      .catch((error) => {
        setStatusMessage("User doesn't exist or password is incorrect.");
        console.error(error)
        return false;
      });
  }

  function likePost(userPostId, username){
    if(currentUser !== ""){
      axios
      .patch(`http://localhost:5001/userposts/${userPostId}/likes`, { username })
      .then((response) => {
        const updatedUserPost = response.data;
        const updatedPosts = posts.map(post =>
          post._id === userPostId ? updatedUserPost : post
        );
        setPosts(updatedPosts); 
      })
      .catch((error) => console.error(error));
    }else{
      setStatusMessage("You must be logged in to like messages!");
    }
  }

  //add page for post whenever number of posts exceeds a multiple of 9
  return (
    <div>
      
      <h1>Animal Sights and Stories</h1>

      <Navbar 
        className="navbar"
        currentUser = {currentUser}
        setCurrentUser={setCurrentUser}
        getRecentPosts={getRecentPosts}
        getCurrentUserPosts={getCurrentUserPosts}
        getPopularPosts={getPopularPosts}
        setRenderedPage={setRenderedPage}
        setStatusMessage={setStatusMessage}
      />

      <p>{statusMessage}</p>

      <p>{currentUser !== "" ? "Currently logged in as: " + currentUser : ""} </p>

      <Switch>
        <Route 
            path="/"
            render={(props) => (
            <MainPage 
              posts={displayedPosts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              renderedPage={renderedPage}
              setRenderedPage={setRenderedPage}
              pageButtons={pageButtons}
              likePost={likePost}
              currentUser={currentUser}
              deletePost={deletePost}
              {...props}
            />
            )} 
          exact
        />

        <Route 
          path="/post"
          render={(props) => (
            <Post 
              username={currentUser}
              addPost={addPost}
              {...props}
            />
          )}
        />
            
        <Route 
          path="/signup"
          render={(props) => (
            <SignUp
              signUp={signUp}
              {...props}
            />
          )}
        />

        <Route 
          path="/login"
          render={(props) => (
            <Login 
              logIn={logIn}
              {...props}
            />
          )}
        />
        
        <Route path="/sources" component={Sources}/>

        <Route path="/documentation" component={Documentation}/>


      </Switch>
    </div>
  );
}

export default App;
