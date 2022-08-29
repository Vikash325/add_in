import React, { useState, useEffect } from "react";
import { VideoApi } from "./VideoApi";
import { Circles } from  'react-loader-spinner'

export default function VideoUpload() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("")
  const [searchText, setSearchText] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [spinner,setSpinner]=useState(true);

  const apikey = "563492ad6f917000010000010371f1cd75fc4721ba8181e98826c1ad"; //use the apikey you have generated

  const getVideo = async () => {

    const data = await fetch(`https://api.pexels.com/videos/popular?per_page=${1}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: apikey,         //use the apikey you have generated
        },
      });
    const response = await data.json();
      //convert the response to json 

    setUsers(response.videos[0].video_files);
    setSpinner(false);
  };

  useEffect(() => {
    getVideo();
  }, []);

  const btnClickVideo = async (Videourl) => {

    const resp = await VideoApi.getVideo(Videourl);
    console.log("resp", resp);

  };

  async function SearchPhotos(query) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${1}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: apikey,
        },
      });
    const response = await data.json();
   
    const searchData = response.photos.filter((name) => name.photographer == query);
    setSearchText(response.photos)
   
    setSearchActive(true)
  }

  return (
    <>
 <div className="row">
  <div className="column">
    <div className="cardInput">
 
      <input 
     placeholder="Search..."
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            SearchPhotos(search);
          }
        }}
      />
      <input type='submit'/>
      </div>
      </div>
      </div>
     
      {searchActive ? <div>{searchText.map((response) => {
        return (
          <>
            {" "}
            <div key={response.id}>
              <p>{response.link}</p>
              {/* <button  onClick={() => btnClick(response.src.original)} >    <img  style={{height:"150px", width:"150px"}}  src={response.src.original} /></button> */}
            </div>
          </>
        );
      })}</div> : <div>
                {spinner ?  <div style={{padding:'40%'}}><Circles color="#00BFFF" height={80} width={80}/></div>:
                users.length &&
                  users.map((response) => {
                    return (
                      <>
                        {" "}
                        <div key={response.id}>
                          {/* <p>{response.link}</p> */}
                          <button title="Click" type="button" onClick={() => btnClickVideo(response.link)} >   <video width="150" height="150" controls >
                            <source src={response.link} type="video/mp4" />
                          </video></button>
        
                        </div>
        
                      </>
                    );
                  })}

       
      </div>
      }
      {/* <button onClick={()=>btnClickVideo("https://player.vimeo.com/external/296210754.hd.mp4?s=08c03c14c04f15d65901f25b542eb2305090a3d7&profile_id=175&oauth2_token_id=57447761")} >Get Video</button> */}

    </>
  );
}

