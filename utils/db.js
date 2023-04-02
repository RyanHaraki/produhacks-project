import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const createNewUser = async (uid, email, name, calendarLink) => {
  await setDoc(doc(db, "users", uid), {
    uid: uid,
    email: email,
    name: name,
    calendarLink: calendarLink,
    location: "",
    patients: [],
    conversations: [],
  });
};

const updateUser = async (uid, data) => {
  await updateDoc(doc(db, "users", uid), data);
};

const getUser = async (uid) => {
  const ref = doc(db, "users", uid);

  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("USER DOES NOT EXIST");
  }
};

export { createNewUser, updateUser, getUser };
