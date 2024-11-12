import React, { useState } from "react";
import axios from "axios";
import Dima from "./sample/Dima.jpg";
import Nasma from "./sample/Nasma.jpg";
import Ghalam from "./sample/Ghalam.jpg";
import Hayah from "./sample/Hayah.jpg";

function ImageSampleTab() {
    // all use state here
    const [imageFile, setImageFile] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [textResponse, setTextResponse] = useState("");
    const [waitingText, setWaitingText] = useState(false);

    const images = [
        Dima,
        Nasma,
        Ghalam,
        Hayah,
    ];

    // funciton to set the image inside the image border
    async function handleImageClick(imagePath) {
        await fetch(imagePath)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], imagePath.split('/').pop(), { type: blob.type });
                setImageFile(file);
                setImageName(file.name);
            })
            .catch((error) => console.error('Error fetching image:', error));

    };

    // function to post the image to the server and get the text response
    async function postImage() {
        const formData = new FormData();
        if (imageFile == null) {
            alert("Please upload an image first");
            return;
        }
        formData.append("image", imageFile, imageName);
        try {
            setWaitingText(true);
            const response = await axios.post('https://34.147.175.180:5000/process-image', formData, {
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
            alert("activate the backend https://34.147.175.180:5000/");
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

    function imageSelected(e) {
        const buttons = document.querySelectorAll('.sample-image');
        buttons.forEach(button => button.classList.remove('sample-image-selected')); // Remove 'pressed' class from all buttons
        e.target.classList.add('sample-image-selected'); // Add 'pressed' class to the clicked button
    }

    return (
        <div className="content_box">
            <div className="sample-image-container">
                <h2>Select Sample Image:</h2>
                {images.map((image, index) => (
                    <img
                        className="sample-image"
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={(e) => {
                            handleImageClick(image);
                            imageSelected(e)
                        }}
                        style={{ width: '100%', margin: '10px', cursor: 'pointer' }}
                    />
                ))}
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

export default ImageSampleTab;
