import { useState, useEffect } from "react";
import { Plus, Package, MapPin, TrendingUp, Calendar, Utensils, Leaf, Award } from "lucide-react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const DonorDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    description: "",
    pickupLocation: "",
    contactPhone: "",
    preferredTime: "",
    expiryTime: ""
  });
  const [donations, setDonations] = useState([]);
  const [user, setUser] = useState(null);

  // Track logged-in user
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch donations for logged-in user
  useEffect(() => {
    if (!user) return;

    const donationsRef = collection(db, "donations");
    const q = query(
      donationsRef,
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            createdAt: docData.createdAt?.toDate ? docData.createdAt.toDate() : new Date()
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt);

      setDonations(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to post a donation.");
      return;
    }

    try {
      const newDonation = {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp(),
        userId: user.uid,
        meals: 0
      };

      await addDoc(collection(db, "donations"), newDonation);

      setFormData({
        foodType: "",
        quantity: "",
        description: "",
        pickupLocation: "",
        contactPhone: "",
        preferredTime: "",
        expiryTime: ""
      });
      setShowForm(false);

      alert("Donation posted successfully!");
    } catch (error) {
      console.error("Error adding donation:", error);
      alert("Failed to post donation. Please try again.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending": return { backgroundColor: "#FBBF24", color: "#fff" };
      case "approved": return { backgroundColor: "#16A34A", color: "#fff" };
      case "picked-up": return { backgroundColor: "#2563EB", color: "#fff" };
      case "completed": return { backgroundColor: "#7C3AED", color: "#fff" };
      default: return { backgroundColor: "#E5E7EB", color: "#111827" };
    }
  };

  const impactStats = [
    { label: "Total Donations", value: donations.length, icon: Package },
    { label: "Meals Provided", value: donations.reduce((sum, d) => sum + (d.meals || 0), 0), icon: Utensils },
    
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB", padding: "1.5rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>Donor Dashboard</h1>
            <p style={{ color: "#6B7280" }}>Share surplus food and track your impact</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#10B981",
              color: "#fff",
              fontWeight: 500,
              cursor: "pointer"
            }}
          >
            <Plus style={{ width: "1rem", height: "1rem" }} />
            <span>New Donation</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {impactStats.map((stat, idx) => (
            <div key={idx} style={{ borderRadius: "0.75rem", padding: "1.5rem", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{stat.label}</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>{stat.value}</p>
                </div>
                <div style={{ width: "3rem", height: "3rem", borderRadius: "0.5rem", backgroundColor: "rgba(16,185,129,0.1)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <stat.icon style={{ width: "1.5rem", height: "1.5rem", color: "#10B981" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Donation Form */}
        {showForm && (
          <div style={{ borderRadius: "0.75rem", padding: "2rem", backgroundColor: "#fff", marginBottom: "2rem", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111827", marginBottom: "1.5rem" }}>Add New Donation</h2>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 500, marginBottom: "0.25rem" }}>Food Type *</label>
                  <select
                    value={formData.foodType}
                    onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #D1D5DB" }}
                  >
                    <option value="">Select food category</option>
                    <option value="fresh-produce">Fresh Produce & Vegetables</option>
                    <option value="prepared-meals">Prepared Meals</option>
                    <option value="packaged-goods">Packaged Goods</option>
                    <option value="dairy-products">Dairy Products</option>
                    <option value="bread-bakery">Bread & Bakery Items</option>
                    <option value="bulk-ingredients">Bulk Ingredients</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, marginBottom: "0.25rem" }}>Quantity *</label>
                  <input
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 10 kg, 50 portions"
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #D1D5DB" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontWeight: 500, marginBottom: "0.25rem" }}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe the food items"
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #D1D5DB" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, marginBottom: "0.25rem" }}>Pickup Location *</label>
                  <input
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #D1D5DB" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, marginBottom: "0.25rem" }}>Contact Phone *</label>
                  <input
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #D1D5DB" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, marginBottom: "0.25rem" }}>Preferred Pickup Time *</label>
                  <input
                    name="preferredTime"
                    type="datetime-local"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #D1D5DB" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 500, marginBottom: "0.25rem" }}>Must be collected by</label>
                  <input
                    name="expiryTime"
                    type="datetime-local"
                    value={formData.expiryTime}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #D1D5DB" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button
                  type="submit"
                  style={{ flex: 1, padding: "0.5rem 1rem", borderRadius: "0.5rem", backgroundColor: "#10B981", color: "#fff", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer" }}
                >
                  <Package style={{ width: "1rem", height: "1rem" }} />
                  Post Donation
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{ flex: 1, padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #D1D5DB", backgroundColor: "#fff", color: "#111827", fontWeight: 500, cursor: "pointer" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Donations List */}
        <div style={{ borderRadius: "0.75rem", padding: "1.5rem", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111827" }}>Your Donations</h2>
            <span style={{ padding: "0.25rem 0.75rem", borderRadius: "0.5rem", backgroundColor: "#E5E7EB", color: "#111827" }}>{donations.length} Total Donations</span>
          </div>

          {donations.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <Package style={{ width: "4rem", height: "4rem", color: "#6B7280", margin: "0 auto 1rem auto" }} />
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>No donations yet</h3>
              <p style={{ color: "#6B7280", marginBottom: "1rem" }}>Start making a difference by posting your first donation!</p>
              <button
                onClick={() => setShowForm(true)}
                style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", backgroundColor: "#10B981", color: "#fff", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer", margin: "0 auto" }}
              >
                <Plus style={{ width: "1rem", height: "1rem" }} />
                Add Your First Donation
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {donations.map((donation) => (
                <div key={donation.id} style={{ borderRadius: "0.75rem", padding: "1.5rem", backgroundColor: "#F3F4F6" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", alignItems: "center" }}>
                    <div style={{ gridColumn: "span 2" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <div>
                          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827" }}>{donation.foodType}</h3>
                          <p style={{ color: "#6B7280" }}>{donation.quantity}</p>
                        </div>
                        <span style={{ padding: "0.25rem 0.75rem", borderRadius: "0.5rem", fontWeight: 500, fontSize: "0.875rem", ...getStatusStyle(donation.status) }}>
                          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1).replace("-", " ")}
                        </span>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.875rem", color: "#6B7280" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <MapPin style={{ width: "1rem", height: "1rem" }} />
                          <span>{donation.pickupLocation}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Calendar style={{ width: "1rem", height: "1rem" }} />
                          <span>Listed: {donation.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
