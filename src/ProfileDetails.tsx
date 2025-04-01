import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./component/navbar";
import "./ProfileDetails.css";
import { RouteComponentProps} from "@reach/router";

const ProfileDetails: React.FC<RouteComponentProps> = () => {   
    const [profile, setProfile] = useState<any>(null);
    const [edit, setEdit] = useState<boolean>(false);
    const [update, setUpdate] = useState<any>({});
    
    useEffect(() => {
        const myProfile = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("http://localhost:5500/myprofile/mydetails", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                alert("Failed to fetch profile");
            }
        };

        myProfile();
    }, []);

    const toggleEdit = () => {
        setEdit(!edit);
        if (!edit && profile) {
            setUpdate({ ...profile });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUpdate({ ...update, [e.target.name]: e.target.value });
    };

    const cancelEdit = () => {
        setUpdate({ ...profile });
    };

    const toggleSave = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.put("http://localhost:5500/update/updateprofile", update, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                alert("Profile updated successfully!");
                setProfile(update);
                setEdit(false);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Profile update failed");
        }
    };

    return (
        <div className="split-container">
            <div className="left-section">
                <Navbar />
            </div>

            {/* Right Section - Profile Content */}
            <div className="right-section">
                <div className="profile-container">
                    {profile ? (
                        <>
                            <div className="profile-header">
                                <img src={profile.pic || "default-profile.jpg"} alt="Profile" className="profile-pic" />
                                <div className="profile-info">
                                    <h2>{profile.firstName} {profile.lastName}</h2>
                                    <p className="profession">{profile.profession || "No profession added"}</p>
                                    {edit ? (
                                        <>
                                            <button className="edit-profile-btn" onClick={toggleSave}>Save Profile</button>
                                            <button className="edit-profile-btn" onClick={cancelEdit} style={{marginLeft:'2px',background:'red'}}>Cancel</button>
                                        </>
                                    ) : (
                                        <button className="edit-profile-btn" onClick={toggleEdit}>Edit Profile</button>
                                    )}
                                </div>
                            </div>

                            <div className="profile-social">
                                <h3>Email</h3>
                                <p>{profile.email}</p> 
                            </div>

                            <div className="profile-social">
                                <h3>Bio</h3>
                                {edit ? (
                                    <input type="text" name="bio" value={update.bio} onChange={handleChange} />
                                ) : (
                                    <p>{profile.bio}</p>
                                )}
                            </div>

                            <div className="profile-social">
                                <h3>Skills</h3>
                                {edit ? (
                                    <input type="text" name="skills" value={update.skills} onChange={handleChange} />
                                ) : (
                                    <p>{profile.skills}</p>
                                )}
                            </div>

                            <div className="profile-social">
                                <h3>Highest Qualification</h3>
                                {edit ? (
                                    <input type="text" name="qualification" value={update.qualification} onChange={handleChange} />
                                ) : (
                                    <p>{profile.qualification}</p>
                                )}
                            </div>

                            <div className="profile-social">
                                <h3>Mobile Number</h3>
                                {edit ? (
                                    <input
                                        type="number"
                                        name="mobilenumber"
                                        value={update.mobilenumber}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{profile.mobilenumber}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>LOADING YOUR PROFILE.......</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;

