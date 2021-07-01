import Card from 'react-bootstrap/Card';

function MemoryCard(props) {
  return (
    <div className="card-wrapper">
      <Card id={props.id} onClick={props.handleCardSelect}>
        <Card.Img variant="top" src={props.cardLink} />
        <Card.Body>
          <Card.Title>{props.cardName}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MemoryCard;
