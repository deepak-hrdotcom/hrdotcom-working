import { useEffect, useState } from "react";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Wizard from "./Wizard.jsx";

// Pages by URL hash: #/create (wizard), #/manual (the original editor), anything else = home
const pageFromHash = () => window.location.hash.replace(/^#\/?/, "") || "home";

export default function Root() {
  const [page, setPage] = useState(pageFromHash);
  useEffect(() => {
    const onHash = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (p) => { window.location.hash = p === "home" ? "" : `/${p}`; };

  if (page === "create") return <Wizard onHome={() => go("home")} />;
  if (page === "manual") {
    return (
      <>
        <button onClick={() => go("home")} style={{ position: "fixed", right: 16, top: 12, zIndex: 50, background: "#fff", border: "1px solid #CBD5E1", borderRadius: 8, padding: "6px 12px", fontWeight: 700, color: "#02588E", cursor: "pointer" }}>← Home</button>
        <App />
      </>
    );
  }
  return <Home go={go} />;
}

