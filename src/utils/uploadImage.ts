import axios from "axios";
import { IMGUR_CLIENT_ID } from "./constant";

export const uploadImage = async (file: File) => {
  try {
    console.log(file);
    if (!file) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${IMGUR_CLIENT_ID}`);
    // myHeaders.append("content-type", "multipart/form-data");

    var formdata = new FormData();
    formdata.append("image", file, "GHJQTpX.jpeg");
    formdata.append("type", "image");
    formdata.append("title", "Simple upload");
    formdata.append("description", "This is a simple image upload in Imgur");
    console.log(formdata);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    const res = await fetch("https://api.imgur.com/3/image", requestOptions);
    if (res.ok) console.log(await res.json());
    else throw new Error("Failed");
    // if (response.status === 200) {
    //   return response.data.data.link;
    // } else {
    // throw new Error("Failed to upload image to Imgur");
    // }
  } catch (error: any) {
    alert(error.message);
    console.error("Error uploading image:", error);
    throw error;
  }
};
