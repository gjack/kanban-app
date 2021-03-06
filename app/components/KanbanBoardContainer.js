import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import {Container} from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';

class KanbanBoardContainer extends Component {
  componentDidMount() {
    CardActionCreators.fetchCards();
  }

  render() {
    let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
      cards: this.state.cards,
    });
    return kanbanBoard;
  }
}

KanbanBoardContainer.getStores = () => ([CardStore]);
KanbanBoardContainer.calculateState = (prevState) => ({
  cards: CardStore.getState().cards
});
export default Container.create(KanbanBoardContainer);
