import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authorProfileService } from '../services/post.services';

function AuthorProfiles() {

    const navigate = useNavigate();
    const params = useParams();

    const [isFetching, setIsFetching] = useState(true);

    const [user, setUser] = useState("")

    useEffect(() => {
        getData();
      }, []);
    
      const getData = async () => {
        try {
          const response = await authorProfileService(params.userId);
          setUser(response.data);
          setIsFetching(false);

        } catch (error) {
          navigate("/error");
        }
      };
      console.log(user)
  
    
  return (
    <div id="profile">
    <img id="profile-img" src={user.profilePicture} alt="img" />
    <h2>{user.username}</h2>
    <h4>{user.email}</h4>
    <h4>
      <img
        className="location-icon"
        src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoDarkPoint_vq2ghz.png"
        alt="pin icon"
      />
      {user.location}
    </h4>
    <h4>{user.age}</h4>
  </div>
  )
}

export default AuthorProfiles