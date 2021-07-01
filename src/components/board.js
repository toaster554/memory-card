import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MemoryCard from './memoryCard';

const NUM_CARDS_PER_ROW = 5;

function CardRow(props) {
  let cards = props.cards;
  return (
    <Row className={`row-cols-${NUM_CARDS_PER_ROW} justify-content-md-center`}>
      {cards.map((card) => (
        <MemoryCard
          key={card.id}
          {...card}
          handleCardSelect={props.handleCardSelect}
        />
      ))}
    </Row>
  );
}

function Board(props) {
  let cards = props.cards;
  let numRows = Math.ceil(props.cards.length / NUM_CARDS_PER_ROW);

  return (
    <Container className="board">
      {[...Array(numRows).keys()].map((rowNum) => {
        let start = rowNum * NUM_CARDS_PER_ROW;
        return (
          <CardRow
            key={rowNum}
            cards={cards.slice(start, start + NUM_CARDS_PER_ROW)}
            handleCardSelect={props.handleCardSelect}
          />
        );
      })}
    </Container>
  );
}

export default Board;
