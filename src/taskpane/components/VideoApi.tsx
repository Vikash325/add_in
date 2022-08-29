import React from 'react'



const data=(baseurl)=>
{
  console.log("baseurl", baseurl)

  

  Office.context.document.setSelectedDataAsync('https://player.vimeo.com/external/296210754.hd.mp4?s=08c03c14c04f15d65901f25b542eb2305090a3d7&profile_id=175&oauth2_token_id=57447761',{
    coercionType: Office.CoercionType.Ooxml,
},

function (asyncResult) {
    if (asyncResult.status === Office.AsyncResultStatus.Failed) 
    {
        console.log('asyncResult',asyncResult.error.message)
    }
});
}
const getVideo = (user) => {
    let baseurl;
  debugger;
        const toDataURL = url => fetch(url).then(response => response.blob()).then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))
      
     
         toDataURL(user).then(dataUrl => {
          
          baseurl=dataUrl;
          const base64Marker = "base64,";
         const index = baseurl.indexOf(base64Marker);
          if (index > 0) {
            baseurl = baseurl.substring(index + base64Marker.length);
          }
        
          if(baseurl)
          {
              data(baseurl)
          }
        })
        
        return baseurl;
      }



 
export const  VideoApi={
  getVideo,
}

