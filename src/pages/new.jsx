import React, { Component } from "react";
import {
  Page,
  Navbar,
  Block,
  Link,
  ListInput,
  List,
  Icon,
  Button,
} from "framework7-react";

import { searchPictograms } from "../services/arasaac";
import { object } from "prop-types";

export default class DynamicRoutePage extends Component {
  constructor(props) {
    super(props);
    this.state = { pictogramId: "default", images: [] };

    this.handleChange = this.handleChange.bind(this);
    this.changeId = this.changeId.bind(this);
  }

  handleChange(event) {
    let id = event.target.value;
    this.setState({ pictogramId: id });
  }

  showImages() {
    if (this.state.images.length) {
      return (
        <div>
          {this.state.images.map((item, idx) => (
            <img src={item} key={idx} alt=''style={{height: '100px', width: '100px'}} />
          ))}
        </div>
      );
    }
  }

  async getPictogramList() {
    const text = this.state.pictogramId;
    const response = await searchPictograms(text)
      .then((res) => res)
      .catch((err) => err);
    console.log(`This is the response: ${response}`);
    this.setState({ images: response });
  }
  changeId(event) {
    this.setState({ pictogramId: event.target.value });
  }

  componentDidMount() {}

  render() {
    return (
      <Page>
        <Navbar title='New Page' backLink='Back' />
        <Block>
          <List noHairlinesMd>
            <ListInput
              label='Pictogram'
              floatingLabel
              type='text'
              placeholder='Write a word'
              clearButton
              onChange={this.handleChange}
            >
              <Icon f7='search' slot='media' />
            </ListInput>
          </List>
          <Button fill onClick={this.getPictogramList.bind(this)}>
            Search
          </Button>
        </Block>
        <Block>
          {this.showImages()}
        </Block>
      </Page>
    );
  }
}
