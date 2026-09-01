import type { Metadata } from "next";
import { GymTracker } from "@/components/gym-tracker";

export const metadata: Metadata = { title: "Gym log — Kuan Yi Wang", description: "A private training log for Kuan Yi Wang." };

export default function GymPage() {
  return <main className="gym-route"><GymTracker /></main>;
}
