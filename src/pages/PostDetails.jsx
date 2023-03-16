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
    <div className="post">
      {isFetching === true ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <div id="post-info">
            <h1>{singlePost.title}</h1>
            <img className="post-img" src={imageUrl} alt={singlePost.title} />
            <div className="post-details" id="country">
              <img
                className="location-icon"
                src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoDarkPoint_vq2ghz.png"
                alt="point icon"
              />
              <span>{singlePost.country}</span>
            </div>
            <p className="post-details">{singlePost.description}</p>
            <p className="post-details-small">{singlePost.category}</p>
            <p className="post-details-small">
              by {singlePost.creator.username}
            </p>
            <button className="reset-btn" onClick={handleFavourites}>
              <img
                className="icon"
                src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976697/secondtimers/icons/LogoHeartOn_gxiqcn.png"
                alt="heart"
              />
            </button>
            {singlePost.creator._id === loggedUser._id ? (
              <div>
                <Link to={`/destinations/edit/${params.postId}`}>
                  <button className="standard-btn-post">Edit</button>
                </Link>
                <button
                  className="standard-btn-post"
                  onClick={handleDeletePost}
                >
                  Delete
                </button>
                <br />
              </div>
            ) : null}
          </div>
          <div id="comments-container">
            <div id="comment-creation">
              <form onSubmit={handleComment}>
                <label htmlFor="comment">Comment:</label>
                <br />
                <textarea
                  width="300px"
                  height="150px"
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <br />
                <button className="standard-btn-post" type="submit">
                  Submit
                </button>
              </form>
            </div>
            {postComments.map((comment) => (
              <div key={comment._id} id="comment-section">
                <p>
                  {comment.comment}
                  <br />
                  by {comment.creator.username}
                  <br />
                  {comment.creator._id === loggedUser._id ? (
                    <span>
                      <button
                        className="standard-btn-post"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </button>
                    </span>
                  ) : null}
                </p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
