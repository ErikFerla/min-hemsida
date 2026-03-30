import Link from "next/link";

const destinations = [
  { name: "Palma", href: "/byar", x: 42, y: 62 },
  { name: "Alcudia", href: "/strandar", x: 58, y: 18 },
  { name: "Soller", href: "/sevardheter", x: 28, y: 28 },
  { name: "Pollenca", href: "/byar", x: 55, y: 15 },
  { name: "Cala d Or", href: "/strandar", x: 68, y: 72 },
  { name: "Manacor", href: "/aktiviteter", x: 65, y: 52 },
  { name: "Inca", href: "/byar", x: 50, y: 38 },
];

export default function MallorcaMap() {
  return (
    <section style={{ background: "#f5f0e8", padding: "60px 20px", textAlign: "center" }}>
      <h2 style={{ fontFamily: "serif", fontSize: "2rem", marginBottom: "8px" }}>
        Utforska Mallorca
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Klicka på ett område för att utforska
      </p>
      <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Mallorca_location_map.svg/1200px-Mallorca_location_map.svg.png"
          alt="Karta over Mallorca"
          style={{ width: "100%", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
        />
        {destinations.map((d) => (
          <Link key={d.name} href={d.href}>
            <div style={{ position: "absolute", left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%, -50%)", cursor: "pointer" }}>
              <div style={{ width: "14px", height: "14px", background: "#c0392b", borderRadius: "50%", border: "2px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }} />
              <span style={{ position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)", background: "white", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", whiteSpace: "nowrap", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
                {d.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
