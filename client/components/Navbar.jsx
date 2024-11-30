import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar(props){
    
    return(
        <nav>
            <ul className="navbar">
                <li><Link to="/" onClick={() => props.getRecentPosts()}>Home</Link></li>
                <li><Link to="/" onClick={() => props.getPopularPosts()}>Popular</Link></li>
                {props.currentUser === "" ? 
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                    :
                    <>
                        <li><Link to="/" onClick={() => {
                            props.getCurrentUserPosts();
                        }}>Your Posts</Link></li>
                        <li><Link to="/post">Post</Link></li>
                        <li><Link to="/" onClick={() => {
                            props.setCurrentUser("");
                            props.setStatusMessage("You have logged out.");
                        }}> 
                        Logout </Link></li>
                    </>
                }
                <li><Link to="/sources">Sources</Link></li>
                <li><Link to="/documentation">Documentation</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;