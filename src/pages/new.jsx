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

import {searchPictograms} from '../services/arasaac'
import { object } from "prop-types";

export default class DynamicRoutePage extends Component {
  constructor(props) {
    super(props);
    this.state = { pictogramId: "default" };


    this.handleChange = this.handleChange.bind(this);
    this.changeId = this.changeId.bind(this);
  }

  handleChange(event) {
    let id = event.target.value;
    this.setState({ pictogramId: id });
  }
  

  async getPictogramList() {
    const text = this.state.pictogramId;
    const response = await searchPictograms(text)
    .then(res =>res).catch(err => err)
    console.log(response)
  }
  changeId(event){
    this.setState({pictogramId: event.target.value})
  }

  componentDidMount() {
    console.log(`Aqui comença la festa`)
    searchPictograms('hola')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Request error: ${err}`);
      });
  }

  render() {
    return (
      <Page>
        <Navbar title="New Page" backLink="Back" />
        <Block>
          <List noHairlinesMd>
            <ListInput
              label="Pictogram"
              floatingLabel
              type="text"
              placeholder="Write a word"
              clearButton
              onChange={this.handleChange}
            >
              <Icon f7="search" slot="media" />
            </ListInput>
          </List>
          <Button fill onClick={this.getPictogramList.bind(this)}>Search</Button>
        </Block>
        <Block>
          <p>{this.state.pictogramId}</p>
        </Block>
      </Page>
    );
  }
}
