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

import moment from 'moment';

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

    const displayFooter = () => {
        const showPrivate = true;
        if (showPrivate) {
            return (
                <>
                    <BlockTitle>
                        <Icon md={`material:${data.isPublic ? 'public' : 'lock'}`}
                        ></Icon>
                        {data.isPublic ? 'Public' : 'Private'}
                    </BlockTitle>
                    <BlockTitle>{moment(data.createdAt.toDate()).calendar()}</BlockTitle>
                </>
            )
        } else {
            return (
                <>
                    <BlockTitle>
                        <Icon md='material:person' />
                        <b>{data.username}</b>
                    </BlockTitle>
                    <BlockTitle>{moment(data.createdAt.toDate()).calendar()}</BlockTitle>
                </>
            )
        }
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
                            <div className="row padding-horizontal-half">
                                <div className="row justify-content-start custom-card__tags">
                                    {showTags()}
                                </div>
                                <div className="row custom-card__subtitle justify-content-space-between align-items-center margin-horizontal-half padding-top-half">
                                    {displayFooter()}
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