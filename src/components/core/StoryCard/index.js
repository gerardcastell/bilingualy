import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    Link,
    Icon,
} from "framework7-react";

import "./style.scss";

const StoryCard = ({ data }) => {
    const [pictograms, setpictograms] = useState(data.pictograms)

    const showTags = () => {
        return data.tags.map((tag, index) =>
            <Chip
                className="margin-horizontal-half"
                text={tag.text}
                color={tag.color}
                key={index}
            />
        )
    }

    const showPictograms = () => {
        return data.pictograms.map(({ url, position }) =>
            // <div className="grid-item-content" key={position}>
            <img
                key={position}
                className="pictogram"
                src={url}
                alt=''
            />
            // </div>
        )
    }

    return (
        <Card
            expandable
            expandableAnimateWidth
            swipeToClose
            className="card-short">

            <CardContent padding={false}>
                <div className="container" style={{ height: "100%" }}>
                    <div className="row">
                        <div className="col bg-color-white card-title">
                            <CardHeader textColor="black" className="display-block">
                                {data.title}<br />
                            </CardHeader>
                            <Link
                                cardClose
                                className="card-opened-fade-in"
                                style={{ position: "absolute", right: "15px", top: "15px" }}
                                iconF7="multiply_circle_fill"
                            />
                            <div className="row padding-horizontal-half padding-top-half">
                                <div className="row justify-content-start">
                                    {showTags()}
                                </div>
                                {/* <div className="row justify-content-center" style={{ width: '100%', marginTop: '.8rem' }}>
                                    <Icon f7="chevron_down"></Icon>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="row card-content-padding ">
                        <div className="col bg-color-primary text-color-white card-content">
                            <div className="card-content__inner">
                                <h4>Description</h4>
                                <p>{data.description}</p>
                                <div className="card-content__inner__pictograms" >

                                    {showPictograms()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

}

export default StoryCard