import React, { useState } from "react";
import axios from "axios"

function UploadImageTab() {
    // all use state here
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [textResponse, setTextResponse] = useState("");
    const [waitingText, setWaitingText] = useState(false);

    // funciton to set the image inside the image border
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file != null) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setImageSrc(event.target.result);
                setImageFile(file);
                setImageName(file.filename);
                setTextResponse("");
            };

            reader.readAsDataURL(file);
        }
    };

    // function to post the image to the server and get the text response
    async function postImage() {
        const formData = new FormData();
        if (imageFile == null) {
            alert("Please upload an image first");
            return;
        }
        formData.append("image", imageFile, imageName);
        console.log(formData);

        try {
            setWaitingText(true);
            const response = await axios.post('Backend API', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setTextResponse(response.data['text']);
            setWaitingText(false);
            if (response.data['text'] == "") {
                alert("the image is not compatible");
            }
        } catch (error) {
            // Handle error gracefully
            console.error('Raji Error uploading image:', error);
            alert("activate the backend >> Backend API");
        }
    }

    // function to copy the text response
    function copy() {
        navigator.clipboard.writeText(textResponse);
        alert("Copied to Clipboard");
    }

    // save text response and download it
    const saveTextAsFile = () => {
        if (textResponse != "") {
            const blob = new Blob([textResponse], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ocr.txt';
            a.click();
            URL.revokeObjectURL(url);
        }
        else {
            alert("Please upload an image then press convert button");
        }
    };

    return (
        <div className="content_box">
            <div className="upload-image-container">
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                />
                <div className="img-area" data-img="">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Uploaded" className="img-preview" />
                    ) : (
                        <>
                            <i className="fa fa-upload icon"></i>
                            <h3>Upload Image</h3>
                            <p>Image size must be less than <span>2MB</span></p>
                        </>
                    )}
                </div>
                <label htmlFor="file" class="select-image">Select Image</label>
            </div>

            <div className="text-area-container">
                <textarea name="text-area" className="text-area" value={textResponse}></textarea>
                <div className="text-area-buttons">
                    <button onClick={postImage} className="button green">Convert</button>
                    <button onClick={copy} className="button">Copy</button>
                    <button onClick={saveTextAsFile} className="button">Save text file</button>
                    {waitingText === true ? <label className="waiting">waiting...</label> : ""}
                </div>
            </div>

        </div>
    );
}

export default UploadImageTab;
