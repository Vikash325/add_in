import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

export default function Base() {
  const [type, setType] = useState();
  const [image, setImage] = useState(true);
  const [video, setVideo] = useState(false);

  const handleImageChange = () => {
    setImage(true)
    setVideo(false);
  }

  const handleVideoChange = () => {
    setImage(false)
    setVideo(true)
  }

  return (
    <>
      <div className="demo">
        <div className="row">
          <div className="columnInput">
            <div className="cardInput">
              <div >
                <input checked={image} name="demoBtn" id="image" type='radio'
                  value="Image" onChange={handleImageChange} />
                <label htmlFor="image">Image</label>
                <input name="demoBtn" id="video" type='radio' checked={video}
                  value="Video" onChange={handleVideoChange} />
                <label htmlFor="video">Video</label>
              </div>
            </div>
          </div>
        </div>
        {image ? <ImageUpload /> : null}
        {/* {video ? <VideoUpload /> : null} */}

      </div>
    </>
  );
}
