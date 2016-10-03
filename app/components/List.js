import React, { Component, PropTypes } from "react";
import { render } from "react-dom";
import Card from "./Card";
import { DropTarget } from 'react-dnd';
import constants from '../constants';
import CardActionCreators from '../actions/CardActionCreators';

const listTargetSpec = {
  hover(props, monitor) {
    const dragged = monitor.getItem();
    CardActionCreators.updateCardStatus(dragged.id, props.id)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class List extends Component {
  render() {
    const { connectDropTarget } = this.props;
    var cards = this.props.cards.map((card) => {
      return <Card key={card.id}
                   id={card.id}
                   title={card.title}
                   description={card.description}
                   color={card.color}
                   tasks={card.tasks}
                   showDetails={card.showDetails}
              />
    });

    return connectDropTarget(
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
