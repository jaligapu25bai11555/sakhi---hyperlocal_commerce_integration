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
    if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLng = position.coords.longitude;
      const userLat = position.coords.latitude;

      map.flyTo({
        center: [userLng, userLat],
        zoom: 13,
        essential: true,
      });
      const pharmacies = generateNearbyPharmacies(userLng, userLat);

pharmacies.forEach((pharmacy) => {
  new mapboxgl.Marker({ color: "#0c831f" })
    .setLngLat([pharmacy.lng, pharmacy.lat])
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setText(pharmacy.name)
    )
    .addTo(map);
});


      // Optional: marker for user location
      new mapboxgl.Marker({ color: "#8e44ad" })
        .setLngLat([userLng, userLat])
        .setPopup(new mapboxgl.Popup().setText("You are here"))
        .addTo(map);
    },
    (error) => {
      console.warn("Location access denied. Using default location.");
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
    }
  );
}


    function generateNearbyPharmacies(userLng, userLat) {
  return [
    {
      id: 1,
      name: "Apollo Pharmacy",
      lng: userLng + 0.005,
      lat: userLat + 0.004,
    },
    {
      id: 2,
      name: "MedPlus",
      lng: userLng - 0.004,
      lat: userLat + 0.003,
    },
    {
      id: 3,
      name: "Local Medical Store",
      lng: userLng + 0.003,
      lat: userLat - 0.005,
    },
    {
      id: 4,
      name: "Sakhi Partner Pharmacy",
      lng: userLng - 0.006,
      lat: userLat - 0.004,
    },
  ];
}


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
