import Hero from "./components/hero";
import RunChapter from "./components/run-chapter";
import GateChapter from "./components/gate-chapter";
import PolicyChapter from "./components/policy-chapter";
import CapabilitiesChapter from "./components/capabilities-chapter";
import GetStartedChapter from "./components/get-started-chapter";

export default function Home() {
  return (
    <>
      <Hero />
      <RunChapter />
      <GateChapter />
      <PolicyChapter />
      <CapabilitiesChapter />
      <GetStartedChapter />
    </>
  );
}
