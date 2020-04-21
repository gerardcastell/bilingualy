import React, { useState } from 'react';
import { Tab, Block } from 'framework7-react';

import { useDispatch, useSelector } from "react-redux";

import { useFirestoreConnect } from "react-redux-firebase";

import StoryCard from '../../core/StoryCard';

const TabSharedStories = ({ onTouchCard }) => {

    const uid = useSelector((state) => state.firebase.auth.uid);
    const myStories = useSelector(
        (state) => state.firestore.ordered.publicStories
    );

    const showMyStories = () => {
        let items = myStories ? myStories : [];
        if (items.length) {
            return items.map((item, idx) => (
                <StoryCard key={idx} data={item} onTouchCard={onTouchCard} />
            ));
        } else {
            return <p>You don't have created any Social Story yet.</p>;
        }
    };

    return (
        <Tab id="tab-shared" className="page-content tab-dashboard">
            {showMyStories()}
        </Tab>
    )
}

export default TabSharedStories
