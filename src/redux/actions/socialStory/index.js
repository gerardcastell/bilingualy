import {
  ADD_PICTOGRAMS,
  NEXT_STEP,
  BACK_STEP,
  CREATE_SOCIAL_STORY,
  CREATE_SOCIAL_STORY_ERROR,
  ADD_TITLE,
  ADD_TAGS,
  ADD_PRIVACITY,
  INIT_SOCIAL_STORY,
  DELETE_SOCIAL_STORY,
  DELETE_SOCIAL_STORY_ERROR,
} from "../../../constants";

const initSocialStory = () => {
  return { type: INIT_SOCIAL_STORY };
};

const addPictograms = (payload) => {
  return {
    type: ADD_PICTOGRAMS,
    payload,
  };
};

const nextStep = () => {
  return { type: NEXT_STEP };
};

const backStep = () => {
  return { type: BACK_STEP };
};

const addTitle = (payload) => {
  return {
    type: ADD_TITLE,
    payload,
  };
};

const addTags = (payload) => {
  return {
    type: ADD_TAGS,
    payload,
  };
};

const addPrivacity = (isPublic) => {
  return {
    type: ADD_PRIVACITY,
    payload: isPublic,
  };
};

const createSocialStory = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const userId = getState().firebase.auth.uid;
  const { step, requestState, ...story } = getState().socialStory;

  try {
    await firestore.collection("socialStories").add({
      ...story,
      username: profile.username,
      userId,
      createdAt: new Date(),
    });
    dispatch({ type: CREATE_SOCIAL_STORY });
  } catch (e) {
    dispatch({ type: CREATE_SOCIAL_STORY_ERROR, payload: e });
  }
};

const deleteSocialStory = (docId) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();

  try {
    await firestore.collection("socialStories").doc(docId).delete();
    dispatch({ type: DELETE_SOCIAL_STORY });
  } catch (e) {
    dispatch({ type: DELETE_SOCIAL_STORY_ERROR, err: e });
  }
};

export default {
  addPictograms,
  createSocialStory,
  nextStep,
  backStep,
  addTitle,
  addTags,
  addPrivacity,
  deleteSocialStory,
  initSocialStory,
};
