import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addFavouriteService } from "../services/auth.services";
import {
  getPostService,
  deletePostService,
  newCommentService,
  getCommentsService,
  deleteCommentService,
} from "../services/post.services";
import { AuthContext } from "../context/auth.context";

function PostDetails() {
  const { isLoggedIn, authenticateUser, loggedUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const params = useParams();

  const [isFetching, setIsFetching] = useState(true);

  const [singlePost, setSinglePost] = useState("");

  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);

  const handleDeletePost = async () => {
    try {
      await deletePostService(params.postId);
      navigate("/destinations/");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFavourites = async () => {
    try {
      await addFavouriteService(params.postId);
      navigate(`/destinations/${params.postId}`);
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
      await newCommentService(params.postId, newComment);
      getData();
      navigate(`/destinations/${params.postId}`);
      setComment("");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentService(commentId);
      getData();
      navigate(`/destinations/${params.postId}`);
    } catch (error) {
      navigate("/error");
    }
    const filteredComments = postComments.filter((eachComment) => {
      if (eachComment._id === commentId) {
        return false;
      } else {
        return true;
      }
    });
    setPostComments(filteredComments);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getPostService(params.postId);
      const comments = await getCommentsService(params.postId);
      // response.data.creator.username;
      //console.log(response.data.creator.username);
      //console.log(response.data.image)
      setSinglePost(response.data);
      setPostComments(comments.data);
      setIsFetching(false);

      // const findComments = await newCommentService();
    } catch (error) {
      navigate("/error");
    }
  };

  let imageUrl = "";
  if (singlePost.image && singlePost.image.length > 0) {
    imageUrl = singlePost.image[0];
  }

  return (
    <div>
      {isFetching === true ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h1>Post</h1>
          <h4>{singlePost.title}</h4>
          <img src={imageUrl} alt="img" width={200} />
          {/* {singlePost.image.map((eachImage) => {
            return (
              <div key={eachImage.image}>
                <img src={eachImage} alt="" />
              </div>
            );
          })} */}
          <p>{singlePost.country}</p>
          <p>{singlePost.description}</p>
          <p>{singlePost.category}</p>
          <p>{singlePost.creator.username}</p>
          {singlePost.creator._id === loggedUser._id ? (
            <div>
              <Link to={`/destinations/edit/${params.postId}`}>
                <button>Edit</button>
              </Link>
              <button onClick={handleDeletePost}>Delete</button>
              <br />
            </div>
          ) : null}
          <button onClick={handleFavourites}>Add to Favourites</button>
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
          {postComments.map((comment) => (
            <p key={comment._id}>
              {comment.comment}
              <br />
              by {comment.creator.username}
              {comment.creator._id === loggedUser._id ? (
                <div>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>
                </div>
              ) : null}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostDetails;
