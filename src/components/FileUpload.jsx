import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {TextContext} from '../context/Context';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


function FileUpload() {

    const navigate = useNavigate();
    const {text, setText} = useContext(TextContext);
    const [error, setError] = useState("");
    const [disable, setDisable] = useState(() => text ? false : true);
    const [showModal, setShowModal] = useState(false);
    const reader = new FileReader();
    
    const handleFile = (e) => {
        const content = e.target.result;
        setDisable(false)
        setText(content)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        reader.onloadend = handleFile;
        try {
            reader.readAsText(e.target[0].files[0]); 
            if (error) {
                setError("")
            }
        } catch (error) {
            setError("It looks like you hit the 'Submit' button but forgot to add file. Please, choose one and try again ;)");
            setShowModal(true);
        }
    }

    const clearTextArea = () => {
        setDisable(true);
        setText("");
    }

    return (
        <Container>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>An error occured...</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{error}</Modal.Body>
            </Modal>
            <Form onSubmit={e => handleSubmit(e)}>
            <Row className="justify-content-md-center pt-5">
                <Col md={'auto'}>
                    <Form.Control 
                        type="file" 
                        multiple={false} 
                        accept=".txt"/>
                    <br/>
                    <Button type='submit'>Submit</Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={6} className="mt-5">
                    <Form.Control as='textarea' 
                        rows={10} 
                        value={text} 
                        placeholder='upload .txt file'
                        readOnly>    
                    </Form.Control>
                    <br/>
                    <Button type='button'
                            variant={ disable ? "outline-light" : "primary"}
                            onClick={clearTextArea} 
                            disabled={disable}>Clear</Button>
                </Col>
            </Row>
            </Form>
            <Button type='button'
                    className="my-5"
                    size="lg"
                    variant={ disable ? "outline-light" : "success"}
                    disabled={disable} 
                    onClick={() => navigate('/result', {state: text})}>Identify Entities</Button>
        </Container>
    );
};

export default FileUpload;