import React, {useEffect, useRef, useState} from 'react';
import '../../helper/helper'
import {getDoc, getOptions, pushData, updateDocument} from "../../helper/helper";

import mail from "../../images/mail.svg";
import user from "../../images/user.svg";
import password from "../../images/password.svg";
import {useLoader} from "../../contexts/loaderContext";
import {storage} from "../../firebase/firebase";
import {useAuth} from "../../contexts/authContext";
import {useUser} from "../../contexts/userContext";
import BackButton from "../../components/backButton";


export default function EditProfile() {
    const {setLoader,loader} = useLoader();
    const {currentUser} = useAuth();
    const hiddenFileInput = React.useRef(null);
    const [file, setFile] = useState('');
    const {user, setUser} = useUser();



    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (event) => {
        setFile('')
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = (event) => {
        setFile(event.target.files[0])
        const fileUploaded = event.target.files[0];
        console.log(file)
    };


    const handleSubmit = (e) => {

        setLoader(true)
        e.preventDefault()
        // Create a reference to the hidden file input element
        var formData = {


            userName: e.target.userName.value,
            email: e.target.email.value,
            facebook: e.target.facebook.value,
            twitter: e.target.twitter.value,


        }
        try {
            //Check if there is an existing file
            {
                file && file.size
                    ?
                    storage.ref(`users/${currentUser.uid}/profilePhoto`).put(file)
                    .then(snapshot => {
                        snapshot.ref.getDownloadURL().then((url) => {
                            { formData &&
                                currentUser.updateProfile({displayName: e.target.userName.value, photoURL: url})
                                    .then(() => {
                                        console.log('Updated CurrentUser!')

                                        var updatedInfo = {userProfileImageUrl: url}

                                        Object.assign(formData, updatedInfo)
                                        // //Update user Info
                                        updateDocument('Users', currentUser.uid, formData)

                                    });
                            }
                        })
                        setFile('')
                        setLoader(false)

                    })
                    .catch(error => {
                        setLoader(false)
                    })
                    : formData
                ?
                    currentUser.updateProfile({displayName: e.target.userName.value})
                        .then(() => {
                            console.log('No file!')
                            //Update user Info
                            updateDocument('Users', currentUser.uid, formData)
                            setLoader(false)
                        })
                        .catch(e => console.log(e))
                    :
                    alert('Error updating')



            }

        } catch (e) {
            setLoader(false)
            console.log(e.message)
            console.log('error')

        }


    }


    return (
        <><BackButton/>
            <form className="form" onSubmit={handleSubmit}>
                <p className="text-danger"></p>

                <div className="input-group">
                    <div className={`ml-5 mb-3 d-flex text-light align-items-center`}>
                        <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                             viewBox="0 0 450 450">
                            <defs>
                                <clipPath id="clip-path">
                                    <rect id="Rectangle_15" data-name="Rectangle 15" width="150" height="150"
                                          transform="translate(230 500)" fill="#18ff00"/>
                                </clipPath>
                            </defs>
                            <g id="camera" transform="translate(-80 -350)">
                                <g id="Rectangle_14" data-name="Rectangle 14" transform="translate(80 350)"
                                   fill="#13161a" stroke="#18ff00" stroke-width="5" stroke-dasharray="20">
                                    <rect width="450" height="450" rx="225" stroke="none"/>
                                    <rect x="2.5" y="2.5" width="445" height="445" rx="222.5" fill="none"/>
                                </g>
                                <g id="Mask_Group_9" data-name="Mask Group 9" clip-path="url(#clip-path)">
                                    <g id="camera-line_11_" data-name="camera-line (11)" transform="translate(230 500)">
                                        <path id="Path_16" data-name="Path 16" d="M0,0H150V150H0Z" fill="none"/>
                                        <path id="Path_17" data-name="Path 17"
                                              d="M61.425,31.25l-12.5,12.5H25v75H125v-75H101.075l-12.5-12.5ZM56.25,18.75h37.5l12.5,12.5h25a6.25,6.25,0,0,1,6.25,6.25V125a6.25,6.25,0,0,1-6.25,6.25H18.75A6.25,6.25,0,0,1,12.5,125V37.5a6.25,6.25,0,0,1,6.25-6.25h25ZM75,112.5a34.375,34.375,0,1,1,34.375-34.375A34.375,34.375,0,0,1,75,112.5ZM75,100A21.875,21.875,0,1,0,53.125,78.125,21.875,21.875,0,0,0,75,100Z"
                                              fill="#18ff00"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span className={`ml-5`}>{file && file.name}</span>

                    </div>

                    <input
                        name={`photo`}
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        style={{display: 'none'}}

                    />
                    <input  type={`text`} style={{display: 'none'}} value={currentUser.photoURL}/>
                    <input required defaultValue={currentUser.email} name="email" style={{backgroundImage: `url(${mail})`}} type="Email" placeholder="Email"/>
                    <input required defaultValue={currentUser.displayName} name="userName" style={{backgroundImage: `url(${user})`}} type="text"
                           placeholder="Username"/>
                    <input  name="facebook" style={{backgroundImage: `url(${password})`}} type="text"
                           placeholder="Facebook"/>
                    <input  name="twitter" style={{backgroundImage: `url(${password})`}} type="text"
                           placeholder="Twitter"/>

                </div>

                <button disabled={loader} style={{background: loader ? '#ffffff' : ''}} type="submit"><span
                    className='form-btn'>Update</span></button>
            </form>
        </>
    );

}

