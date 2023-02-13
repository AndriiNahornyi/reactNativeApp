import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ login, mail, password, photo }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(mail, password);
      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
        email: mail,
        photoURL: photo,
      });
      const { uid, displayName } = await db.auth().currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email: mail,
        photo: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
export const authSignInUser =
  ({ mail, password }) =>
  async (dispatch, getState) => {
    try {
      //   await db.auth().createUserWithEmailAndPassword(mail, password);
      //   const user = await db.auth().currentUser;
      const user = await db.auth().signInWithEmailAndPassword(mail, password);
      console.log(user);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};
export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        photo: user.photoURL,
        email: user.mail,
      };
      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
