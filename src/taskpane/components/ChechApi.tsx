import React from 'react'

export default function ChechApi() {

    const apikey="563492ad6f917000010000010371f1cd75fc4721ba8181e98826c1ad"; //use the apikey you have generated

    async function CuratedPhotos(){
        // fetch the data from api
        const data=await fetch(`https://api.pexels.com/v1/curated?page=${1}`, 
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: apikey,         //use the apikey you have generated
            },
        });
        const response=await data.json();     //convert the response to json 
        console.log("response",response);
    
        display_images(response);            // call the display_images method to display the images on page
    }
    
    function display_images(response){
        //use forEach loop to iterate on each item
        response.photos.forEach((image) => {
            const photo=document.createElement("div");
            photo.innerHTML=`<img src=${image.src.large}>
            <figcaption> Photo By: ${image.photographer}📸</figcaption>`;
            document.querySelector(".display_images").appendChild(photo);
        });
    }

  return (
    <>
    <div>ChechApi</div>
    <button onClick={()=>CuratedPhotos()} >Click Me</button>
    </>
  )
}
