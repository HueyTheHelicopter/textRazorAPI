import { Container } from "react-bootstrap";
import logo from '../react-logo.png';

const Loading = () => {

    return (
        <Container>
            <img src={logo} className="loader logo"/>
            <h2 className="loader text">LOADING<span className="loader dots"/></h2>
        </Container>
    );
}

export default Loading;