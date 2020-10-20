import React, { useState } from "react";
import "./Form_Page.css";
import random_data from "./random_data";
import {storage} from "./Firebase"
import firebase from "firebase"
const HOST = process.env.PORT||'http://localhost:5001'
firebase.functions().useFunctionsEmulator(HOST) 

// import { Link } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import {Redirect} from "react-router-dom";



function FormPage(props) {
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pBody, setPBody] = useState("");
  const [pTags, setPTags] = useState("");      // COULD BE useState([])
//   const [pImg, setPImg] = useState("");    // Should be set when chosen an image file to upload 

 // const allInputs = {imgUrl: ''};
  const [imageAsFile, setImageAsFile] = useState('');
  //const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const updateField = (e) => {

    let fieldValue = e.target.value;

    if (e.target.id === "name_entry") {
        setPName(fieldValue);
    } 
    if (e.target.id === "desc_entry") {
          setPDesc(fieldValue);
    }
    if (e.target.id === "body_entry") {
          setPBody(fieldValue);
    }
    if (e.target.id === "tags_entry") {
          setPTags(fieldValue);
    }

//     if (e.target.id === "main_image_upload") {
//         setPImg(Link to the image);
//   }

};



  async function handleSubmit (event) {
    event.preventDefault();
    const imgUrl = await handleFireBaseUpload(event);
    console.log('Url')
    console.log(imgUrl)
    // const projectDetails= {
    //   id: (random_data.length + 1),
    //   name: pName,
    //   desc: pDesc,
    //   imgURL: "https://aventislearning.com/wp-content/uploads/2017/02/project-management-workshop.jpg",    // NEED to GET THE LINK TO IMAGE FROM PC AND PASTE HERE
    //   tags: pTags.split(","),
    //   body: pBody
    // };

    // console.log(projectDetails);
    // random_data.push(projectDetails);
    // alert("PROJECT HAS BEEN ADDED");

    // const pdata = new FormData(event.target);
    // props.history.push({pathname:"/addproject",state:{pName:pName, pDesc: pDesc, pBody: pBody, pTags:pTags, PImg: pImg }}); /* CHANGHES TO PROJECT PAGE (WITH DETAILS) WHEN CLICKED ON SAVE PROJECT */
  
    // return (
    //     random_data.push(projectDetails)
    // );

  }

  
  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => (image));
  }

  const handleFireBaseUpload = async e => {
    e.preventDefault();
    console.log('start of upload');
    // async magic goes here...
    if(imageAsFile === '' ) {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`);
    }


    const re = /(?:\.([^.]+))?$/;
    var uploadTask = '';
    const ext = re.exec(imageAsFile.name)[1];
    if(ext === 'jpg' || ext === 'png') {
      uploadTask = storage.ref(`/pictures/${imageAsFile.name}`).put(imageAsFile);
    } else {
      uploadTask = storage.ref(`/files/${imageAsFile.name}`).put(imageAsFile);
    }


    return await uploadTask.on('state_changed', async snapshot => {
      console.log(snapshot)
    }, err => {
      console.log(err)
    }, async () => {
      console.log('snapshot');
      const firebaseUrl = await storage.ref('pictures').child(imageAsFile.name).getDownloadURL();
      //return firebaseUrl
      //setImageAsUrl(prevObject => ({...prevObject, imgUrl: firebaseUrl}));
      const projectDetails= {
        userId: 'stavya',
        projectName: pName,
        projectDesc: pDesc,
        imgURL: firebaseUrl,    // NEED to GET THE LINK TO IMAGE FROM PC AND PASTE HERE
        projectTags: pTags.split(","),
        projectBody: pBody
      };
      const add = firebase.functions().httpsCallable('project-add')
      await add(projectDetails)
  
      console.log(projectDetails);
      random_data.push(projectDetails);
      alert("PROJECT HAS BEEN ADDED");
    })


  }




  return (

    <div>

        {/************************************************************************/}

        <div className = "container">

            <h2 id="form_header">Project Details</h2>

            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="name_entry">Project Name</label>
                <input type="text" id="name_entry" name="projectName" placeholder="Enter Project Name" onChange={updateField} value={pName}/>

                <label htmlFor="desc_entry">Project Description</label>
                <input type="text" id="desc_entry" name="projectDescription" placeholder="Enter Short Description of Project" onChange={updateField} value={pDesc}/>

                <label htmlFor="body_entry">Project Body</label>
                <textarea id="body_entry" name="projectBody" placeholder="Enter Detailed Body of Project" style={{height:"150px"}} onChange={updateField} value={pBody}></textarea>

                <label htmlFor="tags_entry">Project Tags</label>
                <input type="text" id="tags_entry" name="projectTags" placeholder="Enter Project Tags separated by comma" onChange={updateField} value={pTags}/>

                <label htmlFor="main_image_upload">Main Project Image Upload</label>
                <input type="file" id="main_image_upload" name="mainImage" onChange={handleImageAsFile} />  {/* MIGHT NEED TO USE VALUE PROPERTY LATER INSIDE THIS INPUT TAG*/}

                <input type="submit" id="submitButton" value="Save Project"/>
            </form>
        
        </div>

        {/**************************************************************************/}

    </div>
    
      
  );
}

// export default withRouter(FormPage);      //MIGHT NEED LATER
export default FormPage;