import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const saveLeaderboardEntry = async ({ name, time, score }) => {
    await addDoc(collection(db, "leaderboard"), {
        name,
        time,
        score,
        createdAt: serverTimestamp(),
    });
};
