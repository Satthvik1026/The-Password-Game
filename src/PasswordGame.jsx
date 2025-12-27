import React, { useState, useEffect, useMemo } from "react";
import { rules } from "./rules";
import { saveLeaderboardEntry } from "./services/leaderboardService";
import NameInputModal from "./components/NameInputModal";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";


const SUBMIT_KEY = "password_game_submitted";

const PasswordGame = () => {
    const [password, setPassword] = useState("");
    const [activeRule, setActiveRule] = useState(null);
    const [isGameComplete, setIsGameComplete] = useState(false);

    const [startTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const [showNameModal, setShowNameModal] = useState(false);
    const [finalTime, setFinalTime] = useState(0);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const gameData = useMemo(() => {
        const moons = [
            { emoji: "🌑", name: "New Moon" },
            { emoji: "🌕", name: "Full Moon" },
            { emoji: "🌓", name: "First Quarter" },
            { emoji: "🌗", name: "Last Quarter" }
        ];

        const countries = [
            { flag: "🇫🇷", name: "France" },
            { flag: "🇩🇪", name: "Germany" },
            { flag: "🇯🇵", name: "Japan" },
            { flag: "🇧🇷", name: "Brazil" },
            { flag: "🇮🇳", name: "India" }
        ];

        const primes = [17, 23, 31, 47, 53, 67, 71, 79, 83, 89, 97];
        const keywords = ["REACT", "VITE", "TAILWIND", "TYPESCRIPT", "NEXTJS"];
        const words = ["GHOST", "SPACE", "LIGHT", "FLAME", "WATER"];

        return {
            company: ["Nike", "Sony", "Dell", "Apple", "Ford"][Math.floor(Math.random() * 5)],
            captcha: Math.random().toString(36).substring(2, 8).toUpperCase(),
            color: { name: "Pink", hex: "#FFC0CB" },
            moon: moons[Math.floor(Math.random() * moons.length)],
            country: countries[Math.floor(Math.random() * countries.length)],
            wordle: words[Math.floor(Math.random() * words.length)],
            prime: primes[Math.floor(Math.random() * primes.length)],
            keyword: keywords[Math.floor(Math.random() * keywords.length)],
        };
    }, []);

    useEffect(() => {
        if (!isTimerRunning) return;

        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerRunning, startTime]);

    useEffect(() => {
        let failing = null;

        for (let rule of rules) {
            const extra = gameData[rule.extraType] || null;

            const context = {
                level: rule.id,
                removedRule: false
            };

            if (!rule.validate(password, extra, context)) {
                failing = rule;
                break;
            }
        }

        if (failing) {
            setActiveRule(failing);
            setIsGameComplete(false);
        } else {
            setActiveRule(null);
            setIsGameComplete(true);
            setIsTimerRunning(false);

            const alreadySubmitted = localStorage.getItem(SUBMIT_KEY);
            if (!alreadySubmitted) {
                setFinalTime(elapsedTime);
                setShowNameModal(true);
            }
        }
    }, [password, gameData, elapsedTime]);

    const renderExtra = () => {
        if (!activeRule?.extraType) return null;
        const data = gameData[activeRule.extraType];

        switch (activeRule.extraType) {
            case "moon":
                return <span className="text-6xl">{data.emoji}</span>;
            case "country":
                return <span className="text-6xl">{data.flag}</span>;
            case "color":
                return <div className="w-16 h-6 rounded" style={{ backgroundColor: data.hex }} />;
            default:
                return <span className="text-4xl font-black">{typeof data === "object" ? JSON.stringify(data) : data}</span>;
        }
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
    };

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleNameSubmit = async (name) => {
        await saveLeaderboardEntry({
            name,
            time: finalTime,
            score: rules.length * 1000 - finalTime * 5
        });

        localStorage.setItem(SUBMIT_KEY, "true");
        setShowNameModal(false);
    };



    return (


        <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto p-10 bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl">
            {isGameComplete && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    numberOfPieces={300}
                    recycle={false}
                />
            )}
            <Link
                to="/leaderboard"
                className="absolute top-6 right-6 text-zinc-300 hover:text-emerald-400 text-2xl"
                title="View Leaderboard"
            >
                🏆
            </Link>


            <div className="w-full mb-4">
                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 transition-all"
                        style={{ width: `${((activeRule?.id || rules.length) / rules.length) * 100}%` }}
                    />
                </div>
                <p className="text-xs text-zinc-400 mt-1 text-right">
                    Progress: {activeRule?.id || rules.length}/{rules.length}
                </p>
            </div>

            <p className="text-sm text-zinc-300 mb-6">
                ⏱ Time: {formatTime(elapsedTime)}
            </p>

            <div className="text-6xl font-black text-white italic mb-10">
                {isGameComplete ? "CLEARED" : `LVL ${activeRule?.id || 1}`}
            </div>

            <textarea
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-6 text-2xl text-white font-mono rounded-2xl focus:border-yellow-500 min-h-[160px] mb-3"
            />

            <button
                onClick={copyPassword}
                className="self-end mb-8 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 text-sm"
            >
                📋 Copy Password
            </button>

            <div className="w-full min-h-[180px]">
                {!isGameComplete ? (
                    <div className="bg-yellow-500 p-6 rounded-2xl text-black">
                        <p className="text-xl font-bold mb-4">{activeRule?.description}</p>
                        <div className="flex justify-center bg-black/10 p-4 rounded-xl">
                            {renderExtra()}
                        </div>
                    </div>
                ) : (
                    <div className="bg-emerald-500 p-8 rounded-2xl text-center text-3xl font-black italic">
                        ACCESS GRANTED
                        <a
                            href="/leaderboard"
                            className="block mt-4 text-lg text-black underline font-bold hover:text-zinc-800"
                        >
                            View Leaderboard →
                        </a>
                    </div>
                )}
            </div>

            <NameInputModal
                isOpen={showNameModal}
                timeTaken={finalTime}
                onSubmit={handleNameSubmit}
            />
        </div>
    );
};

export default PasswordGame;
