import axios from 'axios';
import Graph from "../components/Graph";
import Loading from './Loading';
import TextLine from './TextLine';

import { useContext, useEffect, useState } from 'react';
import { Container, Col, Accordion} from 'react-bootstrap';
import { TextContext } from '../context/Context';

export default function EntitiesRecognized() {

    const API_KEY = 'bc1457d340ba48b6ce1a6d8dba89982dc6d8cd2d528af354df3136b3';

    const { text, setText } = useContext(TextContext);
    const [isLoading, setLoading] = useState(true);
    const [entitiesData, setEntitiesData] = useState([]);
    
    const call_razor = async (text_encoded) => {

        try {
            const response = await axios.post('https://api.textrazor.com/',
            "extractors=entities&text="+text_encoded,
            {
                headers: {
                    'x-textrazor-key': API_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            setEntitiesData(response.data.response.entities)
            setLoading(false)
        } catch (err) {
            console.log(err)
            console.log(err.response.data.error)
            console.log(err.response)
            setLoading(false)
        }
    }

    const dataFetch = async () => {
        if (text) {
            let textEncoded = encodeURIComponent(text)
            await call_razor(textEncoded).then(() => splitIntoSentences())
        } else {
            setLoading(true)
        }
    }

    useEffect(() => {
        if (text) {
            localStorage.setItem('text', text)
        } else {
            setText(localStorage.getItem('text'))
        }
        dataFetch();
    }, [text]);

    const splitIntoSentences = () => {
        
        let changed_text = text.replace(/(\r\n|\n|\r)/gm, " ")
        changed_text = changed_text.replace(/[\w.]\s-\s/g, ': - ')
        changed_text = changed_text.replaceAll('3.5', '3,5')
        changed_text = changed_text.replaceAll(' no. ', ' №')
        changed_text = changed_text.replaceAll(' No ', ' №')
        let sentences = changed_text.split('.')
        sentences.pop("")
        let sentenceHighlighted = sentences.map((sentence, idx) => {
            let props = {
                sentence: sentence,
                entities: entitiesData,
                idx: idx
            }
            return <TextLine props={props} key={idx}/>
        })
        return sentenceHighlighted
    }

    return (
        <Container>
            {isLoading
                ? <Loading/>
                : <Container>
                    <Col style={{marginBottom: "70px", marginTop: "70px"}}>
                        <p>{splitIntoSentences()}</p>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Word Frequency Data</Accordion.Header>
                                <Accordion.Body>
                                    <Graph props={entitiesData}/> 
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Container>
            }
        </Container>
    );
};