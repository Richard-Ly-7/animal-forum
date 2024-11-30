import PageButton from "../components/PageButton";
import UserPost from "../components/UserPost";
import { useEffect } from "react";

function MainPage(props){

    const pageButtonList = props.pageButtons
        .map((pageButton) => (
            <PageButton
                key={pageButton.id}
                page={pageButton.page}
                setCurrentPage={props.setCurrentPage}
                setRenderedPage={props.setRenderedPage}
            /> 
    ));

    const postList = props.posts
        .map((post) => (
            <UserPost
                key={post._id}
                id={post._id}
                username={post.username}
                description={post.description}
                likes={post.likes}
                likedby={post.likedby}
                likePost={props.likePost}
                currentUser={props.currentUser}
                renderedPage={props.renderedPage}
                deletePost={props.deletePost}
            />
    ));

    return (
        <div>
            <div className="post-list">
                {postList}
            </div>
            <div className="button-list">
                {pageButtonList}
            </div>
        </div>
    );

}

export default MainPage;