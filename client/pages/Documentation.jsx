function Documentation(){
    return (
        <ul>
            <li>Run npm install in both the backend and client folders before starting.</li>
            <li>To post images, you must first sign up for an account, and then log in using the login link. After that, you will be able to see the post link, and then you can make your post, which you will see if you click Home.</li>
            <li>The Popular link refers you to the most popular posts, and the Your Posts link shows you your own posts.</li>
            <li>The site meets the adding criteria due to being able to post, and it meets the filtering criteria due to Your Posts filtering by username.</li>
            <li>GET routes were utilized to retrieve the posts, and a POST route was used to upload posts to the database.</li>
            <li>I used a collection to store the users and the posts, and the .env file for the database credentials should be in the backend folder.</li>
            <li>I was a bit short on time, so if you see any unused pieces of code lying around, that is why. For example, the deletePost code. Unfortunately I couldn't figure out how to implement image uploads with MongoDB so that is not implemented in the site yet either.</li>
        </ul>
    );
}

export default Documentation;