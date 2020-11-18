import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import firebase from "../Firebase";

import "./Navbar.css";

function NavBar(props) {
    const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });
    const [imageLoaded, setImageLoadState] = useState(false);

    if (props.profile.imgUrl && !imageLoaded) {
        firebase
            .storage()
            .ref("pictures")
            .child(props.profile.imgUrl)
            .getDownloadURL()
            .then((fireBaseUrl) => {
                setImageAsUrl({ imgUrl: fireBaseUrl });
            });
        setImageLoadState(true);
    }

    if (!props.profile.isEmpty && !props.auth.isEmpty) {
        return (
            <LoggedInNavbar
                auth={props.auth}
                profile={props.profile}
                imgUrl={imageAsUrl.imgUrl}
            />
        );
    } else {
        return <LoggedOutNavbar />;
    }
}

function LoggedInNavbar(props) {
    return (
        <div className="Navbar">
            <div className="navLogo">
                <div className="navButton"></div>
            </div>
            <div className="NavbarButtons">
                <Link to="/">
                    <div className="navButton">Home</div>
                </Link>
                <Link to="/profile">
                    <div className="navButton">My Account</div>
                </Link>
                <Link to="/profile">
                    <div className="navButton">My Page</div>
                </Link>
                <Link to={"/projects/" + props.auth.uid}>
                    <div className="navButton"> My Projects</div>
                </Link>
            </div>
            <div className="navUser">
                <div className="navButton">{props.profile.name}</div>
                {/*<img
                    className="navProfilePicture"
                    src={props.imgUrl}
                    alt=""
                ></img>*/}
            </div>
        </div>
    );
}

function LoggedOutNavbar() {
    return (
        <div className="Navbar">
            <div className="navLogo">
                <Link to="/">
                    <div className="navButton">logogohere</div>
                </Link>
            </div>
            <div className="NavbarButtons"></div>
            <div className="navUser">
                <Link to="/login">
                    <div className="navButton" id="sign-up">
                        Sign-up
                    </div>
                </Link>
                <Link to="/login">
                    <div className="navButton" id="login">
                        Login
                    </div>
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
    };
};

export default connect(mapStateToProps)(NavBar);
