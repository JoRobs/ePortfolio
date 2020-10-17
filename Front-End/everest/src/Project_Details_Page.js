import React from "react";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

import "./Project_Details_Page.css";
import defaultProjectImage from "./Images/project_image.jpg"

function ProjectDetailsPage(props){
    let project = props.project;
    let details = props.projectDetails;

    //check if data is loaded
    if(!project || !details){
        return(
            <div>Loading...</div>
        )
    }

    let postDate = new Date(project.postDate.seconds*1000)
    let dateString = 
        postDate.getDay() + 
        "." + postDate.getMonth() + 
        "." + postDate.getFullYear();

    let imageUrl = project.imgUrl ? project.imgUrl : defaultProjectImage

    return (
        <div className="projectLayout">
            <div className="projectHeader">
                <div className="detailImageWrap">
                    <img className="detailImage" alt="" src={imageUrl}/>
                </div>
                <div className="projectTitle">
                    {project.projectName}
                    <div className="projectAuthor">{project.authorName}</div>
                    <div className="projectDate">{dateString}</div>
                </div>
            </div>
            <div className="projectDescription">
                <div className="descriptionTitle">Description</div>
                <div className="descriptionBody">{project.projectDesc}</div>
            </div>
            <ProjectDetailList details={details}/>
        </div>
    );
}

const ProjectDetailList = (props) => {
    return (props.details.map((detail)=>{
        let background = detail.position%2===0?"#a5a5a5":"white";
        let textColor = detail.position%2===1?"#a5a5a5":"white";
        let style = {background: background, color:textColor}
        return (
            <ProjectDetail key={detail.id} detail={detail} styles={style}></ProjectDetail>
            )
}))
}

const ProjectDetail = (props)=>{
    let detail=props.detail;
    let style=props.styles
    let res = "";
    switch(detail.type){
        case 'right-image':
            res = <RightImgProjectDetail detail={detail} styles={style}/>
            break;
        case 'left-image':
            res =<LeftImgProjectDetail detail={detail} styles={style}/>
            break;
        default:
            res =<DefaultDetail detail={detail} styles={style}/>
    }
    return res;
}

const RightImgProjectDetail = (props) => {
    return (
    <div className="projectDetail" style={props.styles}>
        <div className="detailTitle">{props.detail.title}</div>
        <div className="projectDetailContent">
            <div className="halfDetailText">{props.detail.text}</div>
            <div className="detailImageWrap">
                <img className="detailImage" alt={props.detail.imgText} src={props.detail.imgUrl}/>
            </div> 
        </div>
    </div>
)
}

const LeftImgProjectDetail = (props) => (
    <div className="projectDetail" style={props.styles}>
        <div className="detailTitle">{props.detail.title}</div>
        <div className="projectDetailContent">
            <div className="detailImageWrap">
                <img className="detailImage" alt={props.detail.imgText} src={props.detail.imgUrl}/>
            </div>
            <div className="halfDetailText">{props.detail.text}</div>
        </div>
    </div>
)

const DefaultDetail = (props) => (
    <div className="projectDetail" style={props.styles}>
        <div className="detailTitle">{props.detail.title}</div>
        <div className="projectDetailContent">
            <div className="detailText">{props.detail.text}</div>
        </div>
    </div>
)


const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	return {
        profile: state.firebase.profile,
        project: state.firestore.data.projects && state.firestore.data.projects[id],
        projectDetails: state.firestore.ordered.projectDetails
	};
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        let pid = props.match.params.id;
         return [
            { collection: "projectDetails", orderBy:'position', where:[['projectId', '==', pid]], },
            { collection: "projects", doc: pid }
          ]
        }
    )
)(ProjectDetailsPage);
