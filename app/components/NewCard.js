import React, { Component, PropTypes } from 'react';
import CardForm from './CardForm';
import DraftStore from '../stores/DraftStore';
import {Container} from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';

class NewCard extends Component {
  handleChange(field, value) {
    CardActionCreators.updateDraft(field, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    CardActionCreators.addCard(this.state.draft);
    this.context.router.push('/');
  }

  handleClose(e) {
    this.context.router.push('/');
  }

  componentDidMount(){
    setTimeout(() => CardActionCreators.createDraft(), 0)
  }

  render() {
    return (
      <CardForm
        draftCard={this.state.draft}
        buttonLabel="Create Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)}
      />
    );
  }
}

NewCard.getStores = () => ([DraftStore]);
NewCard.calculateState = (prevState) => ({
  draft: DraftStore.getState().draft
});
NewCard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Container.create(NewCard);
