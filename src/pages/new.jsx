import React, { Component } from "react";
import axios from "axios";
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
    const id = this.state.pictogramId;
      const response = await axios
      .get(`https://api.arasaac.org/api/pictograms/es/search/${id}`)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(`Request error: ${err}`);
        return err;
      });

    console.log(`Response: ${response}`)
  }
  changeId(event){
    console.log(event.target.value)
    this.setState({pictogramId: 'hola'})
    console.log(this.state)
  }

  componentDidMount() {
    console.log(`axios: ${this.state.pictogramId}`)
    axios
      .get(`https://api.arasaac.org/api/pictograms/es/search/adios`)
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
