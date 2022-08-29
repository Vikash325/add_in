/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react'




const data=(baseurl)=>
{
  Office.context.document.setSelectedDataAsync(baseurl,{
    coercionType: Office.CoercionType.Image,
        imageLeft: 100,
        imageTop: 100
},
    );

}
export type AppApiResponse = {
  success: boolean;
  result: any;
};
const getPhoto = async (user): Promise<AppApiResponse> => {


  try {
    let baseurl;
  debugger;
        const toDataURL = url => fetch(url).then(response => response.blob()).then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
         
        }))
  
         await toDataURL(user).then(dataUrl => {
          
          baseurl=dataUrl;
          const base64Marker = "base64,";
         const index = baseurl.indexOf(base64Marker);
         
          if (index > 0) {
            baseurl = baseurl.substring(index + base64Marker.length);
           data(baseurl)
           }
        
         
        })
        // eslint-disable-next-line prettier/prettier
        
      
        return {
          success: true,
          result: baseurl,
        };
      }
      catch (error) {
        return error;
      }
      }


 
export const  appapi={
    getPhoto,
    data
 
}

