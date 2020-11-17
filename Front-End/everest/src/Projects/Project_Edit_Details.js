import React, { useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import firebase from "../Firebase";
import { CancelButton, DeleteButton, SubmitButton } from "./Project_Edit_Buttons";
import { ImageUploadDisplay } from "./Image_Upload_Display";
import defaultProjectImage from "../Images/project_image.jpg";
import storageFunctions from "../storageFirebaseUpload";


export const ProjectDetailList = (props) => {
  return props.details.map((detail) => {
    let style = detail.position % 2 === 0 ? props.style0 : props.style1;
    return (
      <ProjectDetailEdit
        key={detail.id}
        detail={detail}
        styles={style}
        handleDelete={props.handleDelete}
      ></ProjectDetailEdit>
    );
  });
};

const ProjectDetailEdit = (props) => {
  let detail = props.detail;
  let style = props.styles;

  let contentLayout = "";

  const originalTitle = detail.title;
  const originalBody = detail.text;

  const [detailTitle, setDetailTitle] = useState(detail.title);
  const [detailBody, setDetailBody] = useState(detail.text);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(true);
  const [image, setImage] = 
    useState(detail.imgUrl ? detail.imgUrl : defaultProjectImage);

  const updateField = (e) => {
    let fieldValue = e.target.value;
    let id = e.target.id;
    switch (id) {
      case "detailTitleEntry":
        setDetailTitle(fieldValue);
        break;
      case "detailBodyEntry":
        setDetailBody(fieldValue);
        break;
      default:
        break;
    }
    setSubmitDisabled(false);
    setCancelDisabled(false);
  };

  const handleCancel = () => {
    setDetailTitle(originalTitle);
    setDetailBody(originalBody);
    setSubmitDisabled(true);
    setCancelDisabled(true);
  }

  const handleTypeChange = (e) => {
    let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    ref.update({ type:e.target.value });
  }

  const handleSubmit = () => {
    let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    let title = detailTitle?detailTitle:"";
    let text = detailBody?detailBody:"";
    ref.update({ title: title, text: text });
    setSubmitDisabled(true);
    setCancelDisabled(true);
  };

  const handleDelete = () => {
    props.handleDelete(detail.id);
  }

  const uploadImage = (e) => {
    console.log(e);
    //console.log(URL.createObjectURL(e.target.files[0]));

    

    
    // storageFunctions.firebaseUrl(e.target.files[0]).then(url=>{
    //   console.log(url);
    //   let ref = firebase.firestore().collection("projectDetails").doc(detail.id);
    //   ref.update({ imgUrl: url });
    // })
  }

  let detailProps = {
    detail: detail,
    title: detailTitle,
    body: detailBody,
    styles: style,
    imgUrl: image,
    handleImageChange: uploadImage,
    onChange: updateField,
    submit: handleSubmit,
  };

  switch (detail.type) {
    case "right-image":
      contentLayout = RightImgProjectDetailEdit(detailProps);
      break;
    case "left-image":
      contentLayout = LeftImgProjectDetailEdit(detailProps);
      break;
    default:
      contentLayout = DefaultDetailEdit(detailProps);
  }

  return (
    <div className="projectDetail" style={props.styles}>
      <div className="detailHead">
        <div className="detailTitle">
          <input
            type="text"
            id="detailTitleEntry"
            defaultValue={detailTitle}
            onChange={updateField}
          />
        </div>
        <div id="detailType">
          <SelectDetailType 
            id="detailTypeEntry" 
            type={detail.type} 
            onChange={handleTypeChange}
          />
        </div>
        
      </div>
      
      {contentLayout}
      {EditButtons({
        submit:handleSubmit,
        cancel:handleCancel, 
        delete:handleDelete,
        submitDisabled:submitDisabled,
        cancelDisabled:cancelDisabled,
        })}
    </div>
  );
};

const EditButtons = (props) => {
  return (
    <div className="detailEditButtons">
      {SubmitButton(props)}
      {CancelButton(props)}
      {DeleteButton(props)}
    </div>  
  )
}

const RightImgProjectDetailEdit = (props) => {
  let updateField = props.onChange;
  return (
    <div className="detailContent">
      <textarea
        className="halfDetailText"
        id="detailBodyEntry"
        value={props.body}
        onChange={updateField}
      />
      <div className="detailImageWrap" id="right">
        <ImageUploadDisplay imgUrl={props.imgUrl} handleChange={props.handleImageChange}/>
      </div>
    </div>
  );
};

const LeftImgProjectDetailEdit = (props) => {
  let updateField = props.onChange;
  return (
    <div className="detailContent">
      <div className="detailImageWrap" id="left">
        <ImageUploadDisplay imgUrl={props.imgUrl} handleChange={props.handleImageChange}/>
      </div>
      <textarea
        className="halfDetailText"
        id="detailBodyEntry"
        value={props.body}
        onChange={updateField}
      />
    </div>
  );
};

const DefaultDetailEdit = (props) => {
  let updateField = props.onChange;
  return (
    <div className="detailContent">
      <textarea
        className="detailText"
        id="detailBodyEntry"
        value={props.body}
        onChange={updateField}
      />
    </div>
  );
};

const SelectDetailType = (props) => {
  return (
  <Select 
      label="Type"
      onChange={props.onChange} 
      value={props.type}
    >
    <MenuItem value="default">Text Only</MenuItem>
    <MenuItem value="right-image">Right Image</MenuItem>
    <MenuItem value="left-image">Left Image</MenuItem>
  </Select>
  )
  
}