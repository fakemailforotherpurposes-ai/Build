"use client"

export const dynamic = "force-static"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/components/Background";
import FirstScreen from "@/components/FirstScreen";
import SecondScreen from "@/components/SecondScreen";
import LyricsScreen from "@/components/LyricsScreen";
import Music from "@/components/Music";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("first")
  const [musicStarted, setMusicStarted] = useState(false)

  const screens = {
    first: <FirstScreen onNext={() => setCurrentScreen("second")} />,
    second: <SecondScreen onNext={() => {
      setMusicStarted(true)
      setCurrentScreen("lyrics")
    }} />,
    lyrics: <LyricsScreen />,
  }

  return (
    <div className="flex min-h-screen items-center justify-center relative px-4 py-8 overflow-hidden">
      <Background />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>

      {musicStarted && <Music shouldPlay={musicStarted} />}
{/* Final Love Section – Only on Lyrics Screen */}
{currentScreen === "lyrics" && (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="flex flex-col items-center mt-16"
  >
    {/* Floating Heart GIF */}
    <motion.img
      src="/gifs/holding-heart.gif"
      alt="Heart"
      initial={{ y: 0 }}
      animate={{ y: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="w-20 mb-4"
    />

    {/* Your Photo */}
    <motion.img
      src="/gifs/IMG_20251216_181828.jpg"
      alt="Us"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-120 h-60 rounded-2xl object-cover shadow-2xl border border-white/30"
    />

    {/* Anniversary Text */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-5 text-center text-xl font-bold text-pink-400 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]"
    >
      HAPPY 7 MONTHS TO US ❤️
    </motion.p>

    {/* Day Counter */}
    <p className="mt-2 text-sm text-white/70">
      7 months • 210+ days of us 💕
    </p>
  </motion.div>
)}

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
        className="fixed bottom-4 right-4 text-sm text-white/30 pointer-events-none z-50 font-light">
        SATH Forever💕
      </motion.div>
    </div>
  );
}
