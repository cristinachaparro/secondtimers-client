import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getPostService,
  deletePostService,
  newCommentService,
} from "../services/post.services";

function PostDetails() {
  const navigate = useNavigate();

  const params = useParams();

  const [singlePost, setSinglePost] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [comment, setComment] = useState("");

  const handleDeletePost = async () => {
    try {
      await deletePostService(params.postId);
      navigate("/destinations");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const newComment = {
      comment,
    };
    try {
      const response = await newCommentService(params.postId, newComment);
      navigate("/destinations");
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getPostService(params.postId);
      // response.data.creator.username;
      //console.log(response.data.creator.username);
      //console.log(response.data.image)
      setSinglePost(response.data);
      setIsFetching(false);

      // const findComments = await newCommentService();
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      {isFetching === true ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h1>Post</h1>
          <h4>{singlePost.title}</h4>
          {singlePost.image.map((eachImage) => {
            return (
              <div key={eachImage.image}>
                <img src={eachImage} alt="" />
              </div>
            );
          })}
          <p>{singlePost.country}</p>
          <p>{singlePost.description}</p>
          <p>{singlePost.category}</p>
          <p>{singlePost.creator.username}</p>
          <Link to={`/destinations/edit/${params.postId}`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDeletePost}>Delete</button>
          <br />
          <form onSubmit={handleComment}>
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
          <p>{comment}</p>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
