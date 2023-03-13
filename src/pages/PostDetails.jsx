import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostService, deletePostService } from "../services/post.services";

function PostDetails() {
  const navigate = useNavigate();

  const params = useParams();

  const [singlePost, setSinglePost] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const handleDeletePost = async () => {
    try {
      await deletePostService(params.postId);
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
    } catch (error) {
      navigate("/error");
    }
  };
  console.log(singlePost.image)

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
        </div>
      )}
    </div>
  );
}

export default PostDetails;
