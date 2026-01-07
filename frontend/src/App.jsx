import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

/* =========================
   APP (ROUTER ONLY)
========================= */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pharmacies" element={<Pharmacies />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

/* =========================
   HOME (UI + MAP)
========================= */
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVidWdnaW5nanV6eiIsImEiOiJjbWs0ZmdibW4wNXJoM2VyMnkxMTQ0bnU0In0.hDwKyDYFJ9XWTjwtBrsiEQ";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.5946, 12.9716],
      zoom: 12,
    });

    const pharmacies = [
      { id: 1, name: "Apollo Pharmacy", lng: 77.5946, lat: 12.9716 },
      { id: 2, name: "MedPlus", lng: 77.601, lat: 12.975 },
      { id: 3, name: "Local Medical Store", lng: 77.59, lat: 12.968 },
    ];

    map.on("load", () => {
      pharmacies.forEach((p) => {
        new mapboxgl.Marker({ color: "#0c831f" })
          .setLngLat([p.lng, p.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(p.name))
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-left">
          <div className="logo">Sakhi</div>
          <div className="location">
            <span className="small"></span>
            <strong></strong>
          </div>
        </div>

        <div className="search">
          <input type="text" placeholder="Search for essentials" />
        </div>

        <div className="nav-right">
          <button className="login">Login</button>
          <button className="cart" onClick={() => navigate("/cart")}>
            My Cart
          </button>
        </div>
      </header>

      {/* PROMOS */}
      <section className="promos">
        <div className="promo-card purple">
          <h3>Pharmacy at your doorstep</h3>
          <p>Pads, pain relief & more</p>
        </div>

        <div className="promo-card pink">
          <h3>Women’s essentials</h3>
          <p>Delivered discreetly</p>
        </div>

        <div className="promo-card soft">
          <h3>Emergency support</h3>
          <p>Help when you need it</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="category" onClick={() => navigate("/pharmacies")}>
          Pharmacies
        </div>
        <div className="category">Menstrual Care</div>
        <div className="category">Pregnancy</div>
        <div className="category">Pain Relief</div>
        <div className="category">Wellness</div>
        <div className="category">Baby Care</div>
      </section>

      {/* MAP */}
      <section className="map-section">
        <div id="map"></div>
      </section>
    </>
  );
}

/* =========================
   PHARMACIES PAGE
========================= */
function Pharmacies() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "32px" }}>
      <h1>Nearby Pharmacies</h1>
      <p>Showing pharmacies near you.</p>
      <button onClick={() => navigate("/")}>← Back</button>
    </div>
  );
}

/* =========================
   CART PAGE
========================= */
function Cart() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "32px" }}>
      <h1>Your Cart</h1>
      <p>No items added yet.</p>
      <button onClick={() => navigate("/")}>← Continue shopping</button>
    </div>
  );
}

export default App;
