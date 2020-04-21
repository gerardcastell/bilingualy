import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    Link,
    Icon,
    BlockTitle,
} from "framework7-react";

import "./style.scss";

const StoryCard = ({ data, onTouchCard }) => {

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
            <img
                key={position}
                className="pictogram"
                src={url}
                alt=''
            />
        )
    }

    return (
        <Card
            onCardOpen={() => onTouchCard(true)}
            onCardClose={() => onTouchCard(false)}
            expandable
            expandableAnimateWidth
            swipeToClose
            className="card-short custom-card">

            <CardContent padding={false}>
                <div className="container">
                    <div className="row">
                        <div className="col bg-color-white card-title">
                            <CardHeader textColor="black" className="display-block">
                                {data.title}<br />
                            </CardHeader>
                            <Link
                                cardClose
                                className="card-opened-fade-in custom-card__icon-close"
                                iconF7="multiply_circle_fill"
                            />
                            <div className="row padding-horizontal-half padding-top-half">
                                <div className="row justify-content-start custom-card__tags">
                                    {showTags()}
                                </div>
                                <div className="row justify-content-center align-items-center custom-card__subtitle">
                                    <BlockTitle>Posted by <b>{data.username} at {data.createdAt.toString()}</b></BlockTitle>
                                </div>
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