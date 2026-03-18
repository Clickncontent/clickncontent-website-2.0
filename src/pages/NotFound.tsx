import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex flex-col items-center justify-center bg-foreground text-primary-foreground relative px-4">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h1 className="font-display text-7xl lg:text-9xl font-bold tracking-tight">
            4<span className="text-primary">0</span>4
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold">Siden blev ikke fundet</h2>
          <p className="text-lg text-primary-foreground/60 max-w-md mx-auto">
            Beklager, men den side du leder efter, eksisterer ikke eller er blevet flyttet.
          </p>
          <div className="pt-8 w-fit mx-auto relative group">
            {/* Animated effect matching primary buttons */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-50 group-hover:scale-100 transition-transform duration-500" />
            <Link to="/">
              <Button size="lg" className="h-14 px-10 rounded-xl relative">
                Tilbage til forsiden
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
