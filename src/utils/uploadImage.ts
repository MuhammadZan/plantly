import axios from "axios";
import { IMGUR_CLIENT_ID } from "./constant";

export const uploadImage = async (file: File): Promise<string> => {
  try {
    console.log(file);
    if (!file) {
      return "";
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${IMGUR_CLIENT_ID}`);
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
    let link = "";
    const { data, success } = await res.json();
    if (success) link = data.link;
    else throw new Error("Failed");
    return link;
  } catch (error: any) {
    alert(error.message);
    console.error("Error uploading image:", error);
    throw error;
  }
};
