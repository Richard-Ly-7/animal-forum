import { useState } from "react";

function Post(props){
    const [description, setDescription] = useState("");

    function handleChange(event){
        setDescription(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        if(description != ""){
            props.addPost(props.username, description);
            setDescription("");
        }
    }

    return(
        <form onSubmit={handleSubmit} className="make-post">
        <h2>
          Post
        </h2>
        <label for="description">What's on your mind?</label>
        <input
          id="description"
          type="text"
          name="text"
          autoComplete="off"
          value={description}
          onChange={handleChange}
        />
        <button type="submit">
          Post
        </button>
      </form>
    );
}

export default Post;