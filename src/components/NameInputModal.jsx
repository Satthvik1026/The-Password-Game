import React, { useState } from "react";

const NameInputModal = ({ isOpen, timeTaken, onSubmit }) => {
    const [name, setName] = useState("");

    if (!isOpen) return null;

    const handleNameSubmit = async (name) => {
        try {
            await saveLeaderboardEntry({
                name,
                time: finalTime,
                score: rules.length * 1000 - finalTime * 5
            });

            setShowNameModal(false);
            alert("🎉 Saved to leaderboard!");
        } catch (err) {
            console.error(err);
            alert("❌ Failed to save score");
        }
    };


    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-[90%] max-w-md text-white">
                <h2 className="text-2xl font-black mb-4 text-center">
                    🎉 You Survived!
                </h2>

                <p className="text-center mb-6 text-zinc-300">
                    ⏱ Time: <span className="font-mono">{formatTime(timeTaken)}</span>
                </p>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white mb-4"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-emerald-500 text-black font-bold py-3 rounded-lg hover:bg-emerald-400"
                >
                    Submit to Leaderboard
                </button>
            </div>
        </div>
    );
};

export default NameInputModal;
