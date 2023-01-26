import reactStringReplace from 'react-string-replace';
import { Container, Col, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import uuid from 'react-uuid';
import { PopUpCard } from './PopUpCard';


const TextLine = ({props}) => {
    const [sentence, setSentence] = useState(props['sentence']);
    const entities = props['entities'];
    const [showModal, setShowModal] = useState(false);
    const [popUp, setPopUp] = useState();

    const highlightEntities = (data) => {
        let tmp_text = sentence;
        data.map((entity) => {
            let re = new RegExp("\\b(" + entity['matchedText'] + ")\\b", "g")
            tmp_text = reactStringReplace(tmp_text, re, (match) => (
                <a className="entity" key={match+uuid()} onClick={() => showDropdown(entity)}>{match}</a>
            ))
        })
        setSentence(tmp_text)
    }

    const showDropdown = (entity) => {
        setPopUp(<PopUpCard props={entity}/>)
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
        setPopUp(null)
    }

    useEffect(() => {
        highlightEntities(entities)
    }, [props['sentence']])

    return (
        <Container>
            <Col className='mt-2'>
                <p className="text-start">{sentence}<hr/></p>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Body>{popUp}</Modal.Body>
                </Modal>
            </Col>
        </Container>
    )
};

export default TextLine;