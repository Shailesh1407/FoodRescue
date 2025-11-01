import { Link } from "react-router-dom";
import { Button } from "../component/ui/button";
import { Brain, Users, BarChart3 } from "lucide-react";
import heroImage from "../assets/hero-food-rescue.jpg";
import { Card } from "../component/ui/card";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "Predict Waste",
      description:
        "AI-powered algorithms predict food waste patterns to optimize rescue operations before surplus expires.",
      gradient: "linear-gradient(135deg, hsl(142,76%,36%), hsl(38,92%,50%))",
      iconColor: "white",
    },
    {
      icon: Users,
      title: "Rescue Food",
      description:
        "Connect donors, NGOs, and volunteers in real-time to efficiently redistribute surplus food to those in need.",
      gradient: "linear-gradient(135deg, hsl(38,92%,50%), hsl(142,76%,36%))",
      iconColor: "white",
    },
    {
      icon: BarChart3,
      title: "Track Impact",
      description:
        "Measure environmental and social impact with comprehensive analytics, reporting, and certification.",
      gradient: "linear-gradient(135deg, hsl(142,76%,36%), hsl(38,92%,50%))",
      iconColor: "white",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "hsl(0,0%,100%)", color: "hsl(160,15%,15%)" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100vh",
          padding: "0 2rem",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 0,
          }}
        ></div>

        {/* Hero Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", width: "100%" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem" }}>
            AI-Powered <span style={{ color: "hsl(142,76%,36%)", display: "block" }}>Food Rescue</span> Platform
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "3rem", color: "rgba(255,255,255,0.9)" }}>
            Eliminating food waste and hunger through predictive AI, community collaboration, and real-time impact tracking. Join the movement for a sustainable future.
          </p>

          {/* CTA Buttons in Row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/login" style={{ flex: "1 1 200px" }}>
              <Button
                size="lg"
                style={{
                  width: "100%",
                  fontWeight: 600,
                  background: "white",
                  color: "hsl(142,76%,36%)",
                  border: "2px solid hsl(142,76%,36%)",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(142,76%,36%)";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "hsl(142,76%,36%)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Join as Donor
              </Button>
            </Link>

            <Link to="/login" style={{ flex: "1 1 200px" }}>
              <Button
                size="lg"
                style={{
                  width: "100%",
                  fontWeight: 600,
                  border: "2px solid hsl(38,92%,50%)",
                  color: "hsl(38,92%,50%)",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  background: "transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(38,92%,50%)";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(38,92%,50%)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Join as NGO
              </Button>
            </Link>

            <Link to="/login" style={{ flex: "1 1 200px" }}>
              <Button
                size="lg"
                style={{
                  width: "100%",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, hsl(142,76%,36%), hsl(142,76%,50%))",
                  color: "white",
                  border: "none",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
                }}
              >
                Volunteer Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "hsl(0,0%,100%)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "1rem" }}>
              How It <span style={{ color: "hsl(142,76%,36%)" }}>Works</span>
            </h2>
            <p style={{ fontSize: "1.25rem", color: "hsl(160,5%,45%)", maxWidth: "36rem", margin: "0 auto" }}>
              Our three-step approach combines AI prediction, community coordination, and impact measurement
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem" }}>
            {features.map((feature, index) => (
              <Card
                key={index}
                style={{
                  padding: "2rem",
                  borderRadius: "1rem",
                  transition: "all 0.3s ease",
                  background: "white",
                  cursor: "pointer",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 15px 25px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto 1.5rem auto",
                    background: feature.gradient,
                  }}
                >
                  <feature.icon style={{ width: "2rem", height: "2rem", color: feature.iconColor }} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "hsl(160,15%,15%)", marginBottom: "1rem" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "hsl(160,5%,45%)", lineHeight: 1.5 }}>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
