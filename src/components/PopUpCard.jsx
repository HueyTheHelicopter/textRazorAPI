import { Card } from "react-bootstrap";

export const PopUpCard = (props) => {

    const entity = props['props'];
    console.log(entity)

    return(
        <Card style={{ width: 'auto' }}>
        <Card.Body>
          <Card.Title>Entity ID: {entity['entityId']}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Matched text: {entity['matchedText']}  
          </Card.Subtitle>
          <Card.Text>
            <p className="fs-6 lh-1 fw-bold">Confidence Score: {entity['confidenceScore']}</p>
            <p className="fs-6 lh-1 fw-bold">Relevance Score: {entity['relevanceScore']}</p>
            <p className="fs-6 lh-1 fw-bold">Freebase types: </p>
            {entity['freebaseTypes'] ? 
             entity['freebaseTypes'].map((type, i) => <p className="mb-2 text-muted" key={i}>{type}</p>)
             : null}
          </Card.Text>
          <Card.Link href={`${entity['wikiLink']}`}
                        className="wikiLink">
                   {"   "} Wiki Link
            </Card.Link>
            <Card.Link href={`http://www.wikidata.org/wiki/${entity['wikidataId']}`} 
                        className="wikiLink">
                    Wikidata ID: {entity['wikidataId']}
            </Card.Link>
        </Card.Body>
      </Card>
    );
}