import "./App.css";
import Clarifai from "clarifai";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Particles from "react-particles-js";
import { Component } from "react";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import tilt from "react-tilt";

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
            route: "signin",
            isSignedIn: false,
        };
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    onRouteChange = (route) => {
        if (route === "signout") {
            this.setState({ isSignedIn: false });
        } else if (route === "home") {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route: route });
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
        const { isSignedIn, imageURL, box, route } = this.state;
        return (
            <div className="App">
                <Particles className="particles" params={particlesParameters} />
                <Navigation
                    onRouteChange={this.onRouteChange}
                    isSignedIn={isSignedIn}
                />
                {route === "home" ? (
                    <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm
                            onButtonSubmit={this.onButtonSubmit}
                            inputChange={this.onInputChange}
                        />
                        <FaceRecognition imageURL={imageURL} box={box} />
                    </div>
                ) : route === "signin" ? (
                    <SignIn onRouteChange={this.onRouteChange} />
                ) : (
                    <Register onRouteChange={this.onRouteChange} />
                )}
            </div>
        );
    }
}

export default App;
