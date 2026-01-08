import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

/* =========================
   APP (ROUTER ONLY)
========================= */
function PharmacyLanding() {
  const pharmacies = [
    {
      id: 1,
      name: "Apollo Pharmacy",
      distance: "0.6 km",
      eta: "10 mins",
    },
    {
      id: 2,
      name: "MedPlus",
      distance: "1.2 km",
      eta: "15 mins",
    },
    {
      id: 3,
      name: "Sakhi Partner Pharmacy",
      distance: "0.9 km",
      eta: "12 mins",
    },
    {
      id: 4,
      name: "Local Medical Store",
      distance: "0.4 km",
      eta: "8 mins",
    },
  ];

  return (
    <div className="pharmacy-page">
      <h1 className="page-title">Nearby Pharmacies</h1>

      <div className="pharmacy-list">
        {pharmacies.map((pharmacy) => (
          <div key={pharmacy.id} className="pharmacy-card">
            <div className="pharmacy-info">
              <h3>{pharmacy.name}</h3>
              <p>
                {pharmacy.distance} • Delivery in {pharmacy.eta}
              </p>
            </div>

            <button className="contact-btn">
              Contact Pharmacy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


function WomensEssentials() {
  const products = [
    { id: 1, name: "Sanitary Pads", price: "₹120", category: "Menstrual Care" },
    { id: 2, name: "Menstrual Cup", price: "₹399", category: "Menstrual Care" },
    { id: 3, name: "Panty Liners", price: "₹99", category: "Hygiene" },
    { id: 4, name: "Pain Relief Spray", price: "₹180", category: "Pain Relief" },
    { id: 5, name: "Hot Water Bag", price: "₹249", category: "Comfort" },
    { id: 6, name: "Iron Supplements", price: "₹199", category: "Wellness" },
    { id: 7, name: "Pregnancy Test Kit", price: "₹60", category: "Pregnancy" },
    { id: 8, name: "Intimate Wash", price: "₹220", category: "Hygiene" },
    { id: 9, name: "Multivitamins", price: "₹299", category: "Wellness" },
    { id: 10, name: "Heating Patch", price: "₹150", category: "Pain Relief" },
    { id: 11, name: "Maternity Pads", price: "₹180", category: "Postpartum" },
    { id: 12, name: "Herbal Tea", price: "₹140", category: "Relaxation" },
    { id: 13, name: "Sleep Aid Roll-on", price: "₹199", category: "Wellness" },
    { id: 14, name: "Body Heat Balm", price: "₹130", category: "Pain Relief" },
    { id: 15, name: "Folic Acid Tablets", price: "₹160", category: "Pregnancy" },
    { id: 16, name: "Organic Cotton Tampons", price: "₹280", category: "Menstrual Care" },
  ];

  return (
    <div className="products-page">
      <h1 className="page-title">Women’s Essentials</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">{product.price}</p>
            </div>

            <div className="product-actions">
              <button className="add-btn">Add to Cart</button>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function EmergencySupport() {
  return (
    <div className="emergency-page">
      <h1 className="page-title">Emergency Support</h1>
      <p className="page-subtitle">
        Immediate help and support resources for women.
      </p>

      {/* PRIMARY ACTIONS */}
      <div className="emergency-actions">
        <button className="emergency-btn danger">
          Call Emergency Services
        </button>

        <button className="emergency-btn warning">
          Contact Women’s Helpline
        </button>

        <button className="emergency-btn safe">
          Share My Location
        </button>
      </div>

      {/* HELPLINES */}
      <div className="helpline-section">
        <h2>Important Helplines</h2>

        <div className="helpline-card">
          <strong>Women Helpline (India)</strong>
          <span>1091</span>
        </div>

        <div className="helpline-card">
          <strong>Police Emergency</strong>
          <span>112</span>
        </div>

        <div className="helpline-card">
          <strong>Domestic Violence Support</strong>
          <span>181</span>
        </div>
      </div>

      {/* SUPPORT RESOURCES */}
      <div className="support-section">
        <h2>Support Resources</h2>
        <p>
          Access nearby shelters, counseling services, and support groups.
        </p>
      </div>
    </div>
  );
}


function App() {
  return (
    <Routes>
      <Route path="/pharmacy" element={<PharmacyLanding />} />
      <Route path="/womens-essentials" element={<WomensEssentials />} />
      <Route path="/emergency-support" element={<EmergencySupport />} />

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
  <div
    className="promo-card purple"
    onClick={() => navigate("/pharmacy")}
  >
    <h3>Pharmacy at your doorstep</h3>
    <p>Pads, pain relief & more</p>
  </div>

  <div
    className="promo-card pink"
    onClick={() => navigate("/womens-essentials")}
  >
    <h3>Women’s essentials</h3>
    <p>Delivered discreetly</p>
  </div>

  <div
    className="promo-card soft"
    onClick={() => navigate("/emergency-support")}
  >
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

  const cartItems = [
    {
      id: 1,
      name: "Sanitary Pads",
      quantity: 2,
      price: 120,
    },
    {
      id: 2,
      name: "Pain Relief Spray",
      quantity: 1,
      price: 180,
    },
    {
      id: 3,
      name: "Iron Supplements",
      quantity: 1,
      price: 199,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 30;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-page">
      <h1 className="page-title">My Cart</h1>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
            </div>

            <div className="cart-item-price">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>

        <div className="summary-row total">
          <strong>Total</strong>
          <strong>₹{total}</strong>
        </div>
      </div>

      <div className="cart-actions">
        <button className="secondary-btn" onClick={() => navigate("/")}>
          Home
        </button>

        <button className="primary-btn">
          Order Now
        </button>
      </div>
    </div>
  );
}


export default App;
