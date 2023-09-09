import { Box, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import UserDeleteModalBox from "../userDeleteModalBox/userDeleteModalBox";
import InfiniteScroll from "react-infinite-scroll-component";

interface userResponse {
  status: number;
  code: string;
  message: string;
  data: projectUserInfos;
}

interface projectUserInfos{
  userInfos: user[]
}

interface user{
  userUuid: string;
  userEmail: string; 
  userId: string;
  userNickname: string;
  userPhoto: string;
}

export default function MemberBox() {
  const [userData, setUserData] = useState<user[]>([]);
  const [defaultPage, setDefaultPage] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeModalBranch, setActiveModalBranch] = useState<user | null>(null);

  const handleModalOpen = (user: user) => {
    setActiveModalBranch(user)
  }

  const handleModalClose = () => {
    setActiveModalBranch(null);
  }

  let projectUuid = useSelector((state: RootState)=>{
    return state.project.uuid;  
  });
  
  useEffect(() => {
    if(defaultPage >= 0) {
      fetchData();
    }
  }, [defaultPage]);

  const fetchData = async () => {
    if (isLoading || !hasMore) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get<userResponse>(
        '/api/v1/projects/'+ projectUuid +'/users?page='+ defaultPage,
      );
      const data = response.data.data.userInfos;

      if(data.length === 0) {
        setHasMore(false);
      } else {
        setUserData((prevList) => [...prevList, ...data]);
        setDefaultPage(defaultPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchMoreData = () => {
    fetchData();
  };


  // useEffect(() => {
  //   (async () => {
  //       await axios.get<userResponse>('/api/v1/projects/'+ projectUuid +'/users?page=0')
  //       .then((response)=> {
  //           console.log("유저들 정보 불러오기 성공");
  //           console.log("가져온 유저 데이터", response.data.data.userInfos);
  //           setUserData(response.data.data.userInfos);
            
  //       })
  //       .catch((error)=>{
  //           console.log(error);
  //       })
  //   })();
  // }, []); 
  
  
  return(
    <Box sx={{display: "block"}}>
      <InfiniteScroll
        dataLength={userData.length}
        next={fetchMoreData}
        hasMore={defaultPage !== 0}
        loader={<></>}
        endMessage={<></>}
        style={{display: "block"}}
      >
        {userData.map(user => {
          return(
            <Box display="flex" sx={{ mb:"10px", width:"930px", alignItems: "center"}}>
              <Box sx={{width:"45px", height:"45px", borderRadius:100, bgcolor:"black", overflow:"hidden"}}>
                <img width="100%" height="100%" src={user.userPhoto} alt="test" />
              </Box>
              <Box sx={{width:"250px",fontSize: "20px", ml: "30px", fontWeight: "bold", textAlign: "left", textOverflow: 'ellipsis'}}>
                {user.userNickname}
              </Box>
              <Box sx={{display: "flex", alignItems: "center", ml:"auto"}}>
                <IconButton onClick={() => handleModalOpen(user)}>
                  <ExitToAppIcon/>
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </InfiniteScroll>
      <UserDeleteModalBox user={activeModalBranch} onClose={handleModalClose}/>
    </Box>
  );
}