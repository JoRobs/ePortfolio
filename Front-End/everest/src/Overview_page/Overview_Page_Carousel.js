import React from "react";
import "./Overview_Page_Carousel.css";
import Carousel from "react-elastic-carousel";

function CreateCarousel(props) {
    return(
        <Carousel 
            showArrows = {false} 
            enableMouseSwipe = {false}
            enableSwipe = {false}
            // enableAutoPlay = {true}
            // autoPlaySpeed = {3000}
            style = {
                {
                    width: "35%",
                    position: "absolute",
                    left: "7.3%",
                    top: "29%"
                }
            }
        >
            <div className = "slide_content">
                <h3>Welcome,</h3>
                <h3>{props.userProfile.firstName} {props.userProfile.lastName}</h3>
                <h5 id = "guide_message">Here is a guide to get you started</h5>
            </div>

            <div className = "slide_content">
                <h3>Update your</h3>
                <h3>Account Settings</h3>
                <h5  id = "guide_message">Confirm your user information in My Account</h5>
            </div>

            <div className = "slide_content">
                <h3>Write Your</h3>
                <h3>Personal Bio</h3>
                <h5  id = "guide_message">Let your employers know who you are in My Page</h5>
            </div>

            <div className = "slide_content">
                <h3>Add Artifacts to</h3>
                <h3>Your Portfolio</h3>
                <h5  id = "guide_message">Upload and describe your achievements</h5>
            </div>

            <div className = "slide_content">
                <h3>Reflect on your Achievements</h3>
                <h5  id = "guide_message">Experience personal growth</h5>
            </div>

            <div className = "slide_content">
                <h3>Share your Portfolio</h3>
                <h3>with Employers</h3>
                <h5  id = "guide_message">Access a unique url for your portfolio in My Account</h5>
            </div>
        </Carousel>
    );
}

export default CreateCarousel;