import React, { useState } from "react";
import UploadImageTab from "./UploadImageTab";
import ImageSampleTab from "./ImageSampleTab";

function Tab() {
    const [tab, setTab] = useState();

    function display(e, selected) {
        if (selected)
            setTab(<UploadImageTab />)
        else
            setTab(<ImageSampleTab />)

        const buttons = document.querySelectorAll('.tab_btn');
        buttons.forEach(button => button.classList.remove('pressed')); // Remove 'pressed' class from all buttons
        e.target.classList.add('pressed'); // Add 'pressed' class to the clicked button
    }

    return (
        <div class="tab-container">
            <div class="tab_box">
                <button onClick={(e) => display(e, true)} class="tab_btn">Scan Image</button>
                <button onClick={(e) => display(e, false)} class="tab_btn">Image samples</button>
            </div>

            {tab}

        </div>
    )
}

export default Tab;