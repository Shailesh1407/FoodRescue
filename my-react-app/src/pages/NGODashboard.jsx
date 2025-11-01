import { useState, useEffect } from "react";
import { Check, Clock, X, Phone, Mail, Package, Users, Award, TrendingUp } from "lucide-react";
import { db, auth } from "../firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const NGODashboard = () => {
  const [donations, setDonations] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  // Fetch user role
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) setUserRole(userSnap.data().user_type);
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch all donations
  useEffect(() => {
    const donationsRef = collection(db, "donations");
    const q = query(donationsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setDonations(data);
      },
      (error) => console.error("Error fetching donations:", error)
    );
    return () => unsubscribe();
  }, []);

  // Approve / Reject
  const handleApprove = async (id) => {
    const donationRef = doc(db, "donations", id);
    await updateDoc(donationRef, { status: "approved" });
  };
  const handleReject = async (id) => {
    const donationRef = doc(db, "donations", id);
    await updateDoc(donationRef, { status: "rejected" });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending": return { backgroundColor: "#FBBF24", color: "white" };
      case "approved": return { backgroundColor: "#16A34A", color: "white" };
      case "completed": return { backgroundColor: "#2563EB", color: "white" };
      case "rejected": return { backgroundColor: "#DC2626", color: "white" };
      default: return { backgroundColor: "#E5E7EB", color: "#111827" };
    }
  };

  const pending = donations.filter((d) => d.status === "pending");
  const approved = donations.filter((d) => d.status === "approved");
  const rejected = donations.filter((d) => d.status === "rejected");
  const completed = donations.filter((d) => d.status === "completed");

  const stats = [
    { label: "Total Donations", value: donations.length, icon: Package },
    { label: "Pending", value: pending.length, icon: Clock },
    { label: "Approved", value: approved.length, icon: Users },
    { label: "Rejected", value: rejected.length, icon: Award },
    { label: "Completed", value: completed.length, icon: TrendingUp },
  ];

  const renderDonationCard = (d) => (
    <div
      key={d.id}
      style={{
        borderRadius: "0.75rem",
        padding: "1.5rem",
        marginBottom: "1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        backgroundColor: "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div>
          <h2 style={{ fontWeight: 600, fontSize: "1.125rem" }}>{d.full_name || "Anonymous Donor"}</h2>
          <p style={{ color: "#6B7280" }}>{d.foodType || "Food"} • {d.quantity || "N/A"}</p>
        </div>
        <span style={{ padding: "0.25rem 0.75rem", borderRadius: "0.5rem", fontWeight: 500, fontSize: "0.875rem", ...getStatusStyle(d.status) }}>
          {d.status}
        </span>
      </div>

      {(d.phone || d.email) && (
        <div style={{ backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
          <h4 style={{ fontWeight: 500, marginBottom: "0.5rem" }}>Contact</h4>
          {d.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
              <Phone style={{ width: "1rem", height: "1rem" }} /> {d.phone}
            </div>
          )}
          {d.email && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              <Mail style={{ width: "1rem", height: "1rem" }} /> {d.email}
            </div>
          )}
        </div>
      )}

      {userRole === "ngo" && d.status === "pending" && (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => handleApprove(d.id)}
            style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", backgroundColor: "#16A34A", color: "white", fontWeight: 500, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.25rem" }}
          >
            <Check style={{ width: "1rem", height: "1rem" }} /> Approve
          </button>
          <button
            onClick={() => handleReject(d.id)}
            style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", backgroundColor: "#DC2626", color: "white", fontWeight: 500, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.25rem" }}
          >
            <X style={{ width: "1rem", height: "1rem" }} /> Reject
          </button>
        </div>
      )}
    </div>
  );

  const renderTabContent = (tabData) => {
    if (tabData.length === 0) {
      return <p style={{ textAlign: "center", color: "#6B7280" }}>No {activeTab} donations.</p>;
    }
    return tabData.map(renderDonationCard);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB", padding: "1.5rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#111827" }}>NGO Dashboard</h1>
          <p style={{ color: "#6B7280", marginTop: "0.5rem" }}>Manage incoming food donations effectively</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {stats.map((s, idx) => (
            <div key={idx} style={{ borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", backgroundColor: "white" }}>
              <s.icon style={{ width: "2rem", height: "2rem", color: "#10B981", margin: "0 auto 0.5rem auto" }} />
              <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{s.label}</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            {["pending", "approved", "rejected", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
                  margin: "0 0.25rem",
                  cursor: "pointer",
                  backgroundColor: activeTab === tab ? "#10B981" : "#E5E7EB",
                  color: activeTab === tab ? "white" : "#111827",
                }}
              >
                {tab === "pending" ? "🕒 Pending" :
                 tab === "approved" ? "✅ Approved" :
                 tab === "rejected" ? "❌ Rejected" :
                 "🏁 Completed"}
              </button>
            ))}
          </div>

          <div>
            {activeTab === "pending" && renderTabContent(pending)}
            {activeTab === "approved" && renderTabContent(approved)}
            {activeTab === "rejected" && renderTabContent(rejected)}
            {activeTab === "completed" && renderTabContent(completed)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
