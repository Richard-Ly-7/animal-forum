import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function UserPost(props){

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const userLiked = props.likedby.find((user) => user == props.currentUser);

        if(userLiked !== undefined && props.currentUser !== ""){
            setLiked(true);
        }else{
            setLiked(false);
        }

    }, [props.likedby, props.currentUser]);

    return (
        <div className="post">
            <div className="username">{props.username}
                {props.renderedPage === "CurrentUserPosts" && props.username === props.currentUser ? <button onClick={() => props.deletePost()}>Delete</button> : <></> }
            </div>
            <div className="description">{props.description}</div>
            <div className="likes">{props.likes}
                <button onClick={() => {
                    props.likePost(props.id, props.currentUser)
                }}>
                {liked ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i> }</button>
            </div>
        </div>
    );
}

export default UserPost;