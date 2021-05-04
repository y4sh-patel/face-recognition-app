import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ inputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3">Detect faces in your images, Give it a try </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input
                        onChange={inputChange}
                        type="tex"
                        className="f3 pa2 w-70 center"
                    />
                    <button
                        onClick={onButtonSubmit}
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple "
                    >
                        {" "}
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
