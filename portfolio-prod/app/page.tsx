/// ========== Components ========== //
import Header from "@/components/header/Header";
import KuanYiWang from "@/components/sections/KuanYiWang";
import WorkExperience from "@/components/sections/WorkExperience";
import WhatsUp from "@/components/sections/WhatsUp";

import Footer from "@/components/footer/Footer";

/// ========== Next ========== //
import Image from "next/image";

export default function Home() {
  return (
   <main className="text-black">
    <Header />
    <KuanYiWang />
    <WorkExperience />
    <WhatsUp />
    <Footer />
   </main>
  );
}
