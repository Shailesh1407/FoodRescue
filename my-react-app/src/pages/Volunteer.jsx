import { useState, useEffect } from "react";
import { Users, TrendingUp, MapPin, Clock, Car, Phone, CheckCircle, Award, Package } from "lucide-react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

const Volunteer = () => {
  const [assignments, setAssignments] = useState([]);
  const auth = getAuth();
  const currentUid = auth.currentUser?.uid;

  // Fetch approved donations + volunteer assignments
  useEffect(() => {
    const donationsRef = collection(db, "donations");
    const q = query(donationsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(d =>
            d.status === "approved" ||
            (d.status === "assigned" && d.assignedVolunteerId === currentUid) ||
            (d.status === "completed" && d.assignedVolunteerId === currentUid)
          );
        setAssignments(data);
      },
      (error) => {
        console.error("Error fetching donations:", error);
        alert("Error fetching donations: " + (error.message || "Failed to load assignments"));
      }
    );

    return () => unsubscribe();
  }, [currentUid]);

  // Accept an assignment
  const handleAcceptAssignment = async (id) => {
    try {
      const donationRef = doc(db, "donations", id);
      await updateDoc(donationRef, { status: "assigned", assignedVolunteerId: currentUid });

      setAssignments(prev =>
        prev.map(a => a.id === id ? { ...a, status: "assigned", assignedVolunteerId: currentUid } : a)
      );

      alert("Assignment Accepted!");
    } catch (error) {
      console.error("Accept error:", error);
      alert("Failed to accept assignment");
    }
  };

  // Mark assignment as completed
  const handleCompleteAssignment = async (id) => {
    try {
      const donationRef = doc(db, "donations", id);
      await updateDoc(donationRef, { status: "completed" });

      setAssignments(prev =>
        prev.map(a => a.id === id ? { ...a, status: "completed" } : a)
      );

      alert("Assignment Completed!");
    } catch (error) {
      console.error("Complete error:", error);
      alert("Failed to mark assignment as completed");
    }
  };

  // Stats
  const totalPickups = assignments.length;
  const assignedPickups = assignments.filter(a => a.assignedVolunteerId === currentUid && a.status !== "completed").length;
  const completedPickups = assignments.filter(a => a.status === "completed" && a.assignedVolunteerId === currentUid).length;
  const impactScore = assignedPickups > 10 ? "A+" : assignedPickups > 5 ? "A" : "B";

  const impactStats = [
    { label: "Total Pickups", value: totalPickups, icon: Package },
    { label: "Your Assigned Pickups", value: assignedPickups, icon: Users },
    { label: "Completed Pickups", value: completedPickups, icon: CheckCircle },
    { label: "Impact Score", value: impactScore, icon: Award },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return { backgroundColor: "#16A34A", color: "#fff" };
      case 'assigned': return { backgroundColor: "#FBBF24", color: "#fff" };
      case 'completed': return { backgroundColor: "#2563EB", color: "#fff" };
      default: return { backgroundColor: "#E5E7EB", color: "#111827" };
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB", padding: "1.5rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>Volunteer Dashboard</h1>
          <p style={{ color: "#6B7280" }}>Help rescue food and make a difference in your community</p>
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

        {/* Assignments */}
        <div style={{ borderRadius: "0.75rem", padding: "1.5rem", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111827" }}>Pickup Assignments</h2>
            <span style={{ padding: "0.25rem 0.75rem", borderRadius: "0.5rem", backgroundColor: "#E5E7EB", color: "#111827" }}>
              {assignments.filter(a => a.status === 'approved').length} Available
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {assignments.map(a => (
              <div key={a.id} style={{ borderRadius: "0.75rem", padding: "1.5rem", backgroundColor: "#F3F4F6" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", alignItems: "center" }}>
                  
                  {/* Assignment Info */}
                  <div style={{ gridColumn: "span 2" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827" }}>{a.donor || "Anonymous"}</h3>
                    <p style={{ color: "#6B7280" }}>{a.foodType || "Food"}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.875rem", color: "#6B7280", marginTop: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <MapPin style={{ width: "1rem", height: "1rem" }} />
                        <span>Pickup: {a.pickupLocation}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <MapPin style={{ width: "1rem", height: "1rem" }} />
                        <span>Delivery: {a.ngoAddress || "NGO Address"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Clock style={{ width: "1rem", height: "1rem" }} />
                        <span>{a.preferredTime}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Car style={{ width: "1rem", height: "1rem" }} />
                        <span>Quantity: {a.quantity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.5rem" }}>
                    {a.contactPhone && (
                      <div style={{ padding: "1rem", backgroundColor: "#F9FAFB", borderRadius: "0.5rem", fontSize: "0.875rem" }}>
                        <h4 style={{ fontWeight: 500, color: "#111827", marginBottom: "0.5rem" }}>Contact</h4>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Phone style={{ width: "1rem", height: "1rem", color: "#6B7280" }} />
                          <span>{a.contactPhone}</span>
                        </div>
                      </div>
                    )}

                    {a.status === 'approved' && (
                      <button
                        style={{
                          width: "100%",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.5rem",
                          backgroundColor: "#10B981",
                          color: "#fff",
                          fontWeight: 500,
                          cursor: "pointer"
                        }}
                        onClick={() => handleAcceptAssignment(a.id)}
                      >
                        Accept Assignment
                      </button>
                    )}

                    {a.status === 'assigned' && a.assignedVolunteerId === currentUid && (
                      <>
                        <button
                          style={{
                            width: "100%",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "#2563EB",
                            color: "#fff",
                            fontWeight: 500,
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            const origin = encodeURIComponent(a.ngoAddress || "");
                            const destination = encodeURIComponent(a.pickupLocation || "");
                            const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
                            window.open(url, "_blank");
                          }}
                        >
                          Get Directions
                        </button>
                        <button
                          style={{
                            width: "100%",
                            padding: "0.5rem 1rem",
                            marginTop: "0.5rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "#10B981",
                            color: "#fff",
                            fontWeight: 500,
                            cursor: "pointer"
                          }}
                          onClick={() => handleCompleteAssignment(a.id)}
                        >
                          Mark as Completed
                        </button>
                      </>
                    )}

                    {a.status === 'completed' && (
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: "0.5rem", fontWeight: 500, fontSize: "0.875rem", ...getStatusStyle("completed") }}>
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {assignments.filter(a => a.status === 'approved').length === 0 && (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <Users style={{ width: "4rem", height: "4rem", color: "#6B7280", margin: "0 auto 1rem auto" }} />
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>No assignments available</h3>
                <p style={{ color: "#6B7280", marginBottom: "1rem" }}>Check back later for new pickup opportunities in your area.</p>
                <button style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #2563EB", backgroundColor: "#fff", color: "#2563EB", fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  <TrendingUp style={{ width: "1rem", height: "1rem" }} /> View Impact Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
