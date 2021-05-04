import "./App.css";
import Clarifai from "clarifai";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Particles from "react-particles-js";
import { Component } from "react";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({ apiKey: "0d05b1253dae4d949261c0c3e994ebca" });

const particlesParameters = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800,
            },
        },
    },
};
class App extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            inputURL: "",
            box: {},
        };
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    calculateFaceLocation(data) {
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box;
        console.log(data);
        const image = document.getElementById("inputImage");
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height,
        };
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({ box: box });
    };

    onButtonSubmit = () => {
        this.setState({ imageURL: this.state.input });
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then((response) =>
                this.displayFaceBox(this.calculateFaceLocation(response))
            )
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <Particles className="particles" params={particlesParameters} />

                <Logo />
                <Rank />
                <ImageLinkForm
                    onButtonSubmit={this.onButtonSubmit}
                    inputChange={this.onInputChange}
                />
                <FaceRecognition
                    imageURL={this.state.imageURL}
                    box={this.state.box}
                />
            </div>
        );
    }
}

export default App;
