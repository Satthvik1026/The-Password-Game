import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";


const Leaderboard = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        const q = query(
            collection(db, "leaderboard"),
            orderBy("time", "asc"),
            orderBy("score", "desc"),
            limit(10)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setEntries(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                Loading leaderboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-10">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700"
            >
                ← Back
            </button>

            <h1 className="text-4xl font-black text-center mb-10">
                🏆 Leaderboard
            </h1>

            <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-zinc-800">
                        <tr>
                            <th className="p-4 text-left">#</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Time</th>
                            <th className="p-4 text-left">Score</th>
                            <th className="p-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => (
                            <tr
                                key={entry.id}
                                className="border-t border-zinc-800 hover:bg-zinc-800/50"
                            >
                                <td className="p-4 font-bold">
                                    {index === 0 && "🥇"}
                                    {index === 1 && "🥈"}
                                    {index === 2 && "🥉"}
                                    {index > 2 && index + 1}
                                </td>
                                <td className="p-4">{entry.name}</td>
                                <td className="p-4 font-mono">
                                    {formatTime(entry.time)}
                                </td>
                                <td className="p-4">{entry.score}</td>
                                <td className="p-4 text-sm text-zinc-400">
                                    {entry.createdAt?.toDate
                                        ? entry.createdAt.toDate().toLocaleDateString()
                                        : "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {entries.length === 0 && (
                    <p className="text-center p-6 text-zinc-400">
                        No entries yet. Be the first to survive 😈
                    </p>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
