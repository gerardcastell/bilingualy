import React, {Component}  from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Link,
  Icon,
  Row
} from "framework7-react";

import "./CardItem.scss";

export class CardItem extends Component {
  render() {
    return (
      <div>
      <Card expandable expandableAnimateWidth swipeToClose onCardOpen={this.onCard.bind(this)} className="card-short">
        <CardContent padding={false}>
          <div className="container" style={{ height: "100%" }}>
            <div className="row">
              <div className="col bg-color-white card-title">
                <CardHeader textColor="black" className="display-block">
                  Title Social Story
                  <br />
                </CardHeader>
                <Link
                  cardClose
                  className="card-opened-fade-in"
                  style={{ position: "absolute", right: "15px", top: "15px" }}
                  iconF7="multiply_circle_fill"
                />
                <div className="row padding-horizontal-half padding-top-half">
                  <div className="row justify-content-start">
                    <Chip className="margin-horizontal-half" text="Red Chip" color="red" />
                    <Chip className="margin-horizontal-half" text="Green Chip" color="green" />
                    <Chip className="margin-horizontal-half" text="Blue Chip" color="blue" />
                    <Chip className="margin-horizontal-half" text="Orange Chip" color="orange" />
                    <Chip className="margin-horizontal-half" text="Pink Chip" color="pink" />
                  </div>
                  <div className="row justify-content-center" style={{width: '100%', marginTop: '.8rem'}}>
                    <Icon f7="chevron_down"></Icon>
                  </div>
                </div>
              </div>
            </div>
            <div className="row card-content-padding ">
              <div className="col bg-color-primary text-color-white card-content">
                <div className="inner-content">
                  <h4>Description</h4>
                  <p>
                    Framework7 - is a free and open source HTML mobile framework
                    to develop hybrid mobile apps or web apps with iOS or
                    Android (Material) native look and feel...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    )
  }
  onCard(){
    console.log('esooooooo')
  }
}

