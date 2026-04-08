import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, TrendingUp, Users, Target, Eye, Calendar, CircleDollarSign, Zap, Video, BarChart3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { VIDEOS, getMediaUrl } from "@/lib/supabase";

const caseData: Record<string, {
  client: string;
  slug: string;
  category: string;
  platform: string;
  service: string;
  tagline: string;
  metrics: { label: string; value: string }[];
  om: string;
  udfordringer: string;
  loesning: string;
  loesningPoints?: { label: string; text: string }[];
  resultater: { title: string; points: string[] }[];
  hvadViLaerte?: { title: string; text: string }[];
  takeaway?: { intro: string; points: string[]; outro: string };
  color: string;
  heroImage?: string;
  bodyImage?: string;
}> = {
  "nadim-aesthetics": {
    client: "Nadim Aesthetics",
    slug: "nadim-aesthetics",
    category: "Skønhed & Æstetik",
    platform: "Organisk + Meta",
    service: "Organisk video content",
    tagline: "200.000 organiske visninger på 30 dage — 0 kr. i annoncering",
    metrics: [
      { label: "Organiske visninger", value: "200K" },
      { label: "Dage", value: "30" },
      { label: "Annonceringsbudget", value: "0 kr." },
    ],
    om: "Nadim Aesthetics er en dansk æstetikklinik med fokus på naturlige og subtile behandlinger. Klinikken ønskede at vokse sin synlighed på sociale medier uden nødvendigvis at bruge et stort annoncebudget.",
    udfordringer: "Udfordringen var at skabe troværdigt og engagerende videoindhold i en branche, hvor det kan være svært at kommunikere behandlingernes kvalitet og naturlighed. Klinikken havde brug for content, der stoppede scrollet og opbyggede tillid hos en ny målgruppe.",
    loesning: "Vi udviklede en organisk video-strategi fokuseret på autentiske behind-the-scenes og resultat-drevne videoer. Indholdet var skabt til at performe på TikTok og Instagram Reels med stærke hooks og visuelle kontraster, der skabte høj retention.",
    resultater: [
      {
        title: "Organisk performance",
        points: [
          "200.000 organiske visninger på blot 30 dage.",
          "Markant stigning i profilbesøg og klinikhenvendelser.",
          "Nul kroner brugt på betalt annoncering.",
        ],
      },
    ],
    color: "from-primary/40 via-primary/20 to-accent",
  },
  "lumant": {
    client: "Lumant",
    slug: "lumant",
    category: "B2B / Leads",
    platform: "Meta",
    service: "Video creatives & creative strategi",
    tagline: "3x flere leads — lukkeraten på møder steg fra 25% til 50%",
    metrics: [
      { label: "Leads stigning", value: "3x" },
      { label: "Lukkerate", value: "50%" },
      { label: "Tidligere lukkerate", value: "25%" },
    ],
    om: "Lumant er en B2B-virksomhed, der hjælper andre virksomheder med at optimere deres forretningsprocesser. De kom til os med et ønske om at skalere deres lead-generering via Meta og samtidig forbedre kvaliteten af de leads, de modtog.",
    udfordringer: "B2B-annoncering på Meta er notorisk svær — målgruppen er smal, og budskabet skal ramme præcist. Lumant kæmpede med lavt engagement og en lukkerate, der ikke afspejlede kvaliteten af deres produkt.",
    loesning: "Vi skabte en serie af video creatives målrettet beslutningstagere med tydelige smertepunkter og konkrete løfter. Kombinationen af talking-head videoer og testimonial-lignende formater skabte troværdighed og drev kvalificerede leads ind i pipeline.",
    resultater: [
      {
        title: "Lead-generering",
        points: [
          "3x stigning i antallet af kvalificerede leads via Meta.",
          "Lukkeraten på salgsmøder steg fra 25% til 50%.",
          "Markant forbedring i lead-kvalitet og pipeline-hastighed.",
        ],
      },
    ],
    color: "from-accent via-primary/30 to-primary/15",
  },
  "skoenhedsklinik-aarhus": {
    client: "Skønhedsklinik Aarhus",
    slug: "skoenhedsklinik-aarhus",
    category: "Skønhed",
    platform: "Meta",
    service: "Meta video ads & creative testing",
    tagline: "4x ROAS på Meta-annoncering",
    metrics: [
      { label: "ROAS", value: "4x" },
      { label: "Platform", value: "Meta" },
      { label: "CPA", value: "Halveret" },
    ],
    om: "Skønhedsklinik Aarhus er en veletableret skønhedsklinik i Aarhus, der tilbyder alt fra hudpleje til avancerede æstetiske behandlinger. De ønskede at styrke deres digitale tilstedeværelse og drive flere bookinger via Meta.",
    udfordringer: "Klinikken brugte allerede budget på Meta, men uden de ønskede resultater. Creatives var generiske og performede ikke nok til at retfærdiggøre spend. Der var brug for en klar creative strategi og bedre indhold.",
    loesning: "Vi analyserede deres eksisterende data og identificerede de hooks og formater, der resonerede bedst med deres lokalgemindede målgruppe. Vi producerede et batteri af test-klare videoer med fokus på behandlingsresultater og sociale beviser.",
    resultater: [
      {
        title: "Kampagneresultater",
        points: [
          "4x ROAS på Meta-annoncering.",
          "Markant reduktion i cost-per-acquisition.",
          "Stabil strøm af bookinger via betalt social.",
        ],
      },
    ],
    color: "from-primary/30 to-accent",
  },
  "hejslet-begravelsesforretning": {
    client: "Hejslet Begravelsesforretning",
    slug: "hejslet-begravelsesforretning",
    category: "Lokale services",
    platform: "Meta",
    service: "Video produktion & Meta ads",
    tagline: "Markant stigning i henvendelser og fuld kapacitet opnået via kreative videoer",
    metrics: [
      { label: "Videoer produceret", value: "15" },
      { label: "Annoncebudget", value: "6.780 kr." },
      { label: "Kapacitet", value: "Fuld" },
    ],
    om: "Hejslet Begravelsesforretning er en lokal aktør, som primært fik kunder gennem mund-til-mund og eksisterende netværk. Det gav en ustabil tilgang af henvendelser og begrænsede muligheder for at skalere forretningen.",
    udfordringer: "De ønskede en mere stabil og forudsigelig tilgang af nye henvendelser. Samtidig opererer branchen i et følsomt og tillidsbaseret marked, hvor klassisk reklame ofte har begrænset effekt — det krævede en anden kreativ tilgang.",
    loesning: "Vi udviklede og producerede 15 videoer over ca. 3 måneder med ejeren selv som frontfigur. I stedet for kun at producere klassisk content, arbejdede vi bevidst med forskellige kreative vinkler, der både skabte tillid og opmærksomhed.",
    loesningPoints: [
      { label: "Tillid", text: "Personlige og oplysende videoer med ejeren som frontfigur — autentisk kommunikation, der skaber nærvær og troskærdighed." },
      { label: "Opmærksomhed", text: "Visuelle og anderledes hooks — fx en trompet på stranden eller en Tesla rustvogn — der bryder med branchens standarder og stopper scrollet." },
    ],
    resultater: [
      {
        title: "Resultater",
        points: [
          "Højt engagement og stabil trafik til hjem mesiden.",
          "Markant stigning i kundehenvendelser — fuld kapacitet opnået.",
          "Virksomheden blev efterfølgende solgt som en direkte konsekvens af den øgede aktivitet.",
        ],
      },
    ],
    hvadViLaerte: [
      {
        title: "1. Pattern interrupts driver performance",
        text: "Videoer der brød forventningen — fx en trompet på stranden eller en Tesla rustvogn — skabte markant højere engagement og lavere klikpriser.",
      },
      {
        title: "2. Kombinationen af opmærksomhed og tillid er afgørende",
        text: "De bedst performende videoer kombinerede et stærkt visuelt hook med efterfølgende troskærdig kommunikation fra ejeren.",
      },
      {
        title: "3. Klassisk content performer — men skaber ikke spikes",
        text: "Rene \"talking head\"-videoer leverede stabil performance, men det var de kreative variationer, der drev den største effekt.",
      },
    ],
    takeaway: {
      intro: "Selv i konservative brancher kan efterspørgsel skabes hurtigt, når man kombinerer:",
      points: [
        "Kreative hooks der stopper scroll",
        "Autentisk kommunikation der skaber tillid",
      ],
      outro: "Det handler ikke kun om at producere content — men om at teste, identificere og skalere de kreative vinkler, der faktisk virker.",
    },
    color: "from-accent via-primary/20 to-primary/10",
    heroImage: getMediaUrl("images", "hejslet-logo.png"),
    bodyImage: getMediaUrl("images", "hejslet-photo.png"),
  },
  "dress-for-success": {
    client: "Dress for Success",
    slug: "dress-for-success",
    category: "Mode & Livsstil",
    platform: "Meta",
    service: "Video creatives & Meta ads",
    tagline: "Slog corona-rekord — 'Vi har aldrig haft noget, der har performet sådan her.'",
    metrics: [
      { label: "Rekord", value: "Slået" },
      { label: "Platform", value: "Meta" },
      { label: "Salg", value: "↑↑" },
    ],
    om: "Dress for Success er en dansk mode-virksomhed med fokus på stærke visuelle identiteter og sæsonbetonede kampagner. De kom til os med ambitioner om at slå deres hidtil bedste kampagneresultater.",
    udfordringer: "Branchen er ekstremt konkurrencepræget på Meta, og priserne på annoncering stiger konstant. Udfordringen var at skabe creatives, der var visuelt stærke nok til at skille sig ud i et mættet feed og konvertere direkte til salg.",
    loesning: "Vi skabte en serie af højt polerede video-ads med stærkt visuelt storytelling og tydelige call-to-actions. Formaterne var optimeret til både feed og stories, og vi testede systematisk hooks og vinkler for at finde de vindende kombinationer.",
    resultater: [
      {
        title: "Kampagneresultater",
        points: [
          "Slog virksomhedens hidtil bedste kampagneresultat — kaldet 'corona-rekorden'.",
          "Kunden udtalte: 'Vi har aldrig haft noget, der har performet sådan her.'",
          "Markant stigning i salg og omsætning i kampagneperioden.",
        ],
      },
    ],
    color: "from-primary/25 to-accent",
  },
};

const CaseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const c = slug ? caseData[slug] : null;

  if (!c) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Case ikke fundet</h1>
          <Link to="/cases" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Tilbage til cases
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/cases"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Alle cases
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left — gradient dummy visual */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/15 border border-primary/10 ${
                c.slug === "lumant" ? "bg-black" : c.heroImage ? "bg-white" : `bg-gradient-to-br ${c.color}`
              }`}>
                {c.slug === "lumant" ? (
                  <video
                    src={VIDEOS.lumantTestimonial}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : c.heroImage ? (
                  <img
                    src={c.heroImage}
                    alt={c.client}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-display text-6xl font-bold text-primary-foreground/20 select-none">{c.client[0]}</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
                {/* Platform tag */}
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold tracking-wider uppercase bg-foreground/60 backdrop-blur-md text-primary-foreground/80 px-3 py-1 rounded-full">
                    {c.platform}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right — headline + metrics */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{c.category}</p>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                {c.client}
              </h1>
              <p className="text-foreground/60 text-lg leading-relaxed mb-8 max-w-xl">
                {c.tagline}
              </p>

              {/* Metrics box */}
              <div className="grid grid-cols-3 gap-0 border border-border rounded-xl overflow-hidden mb-8">
                {c.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`p-5 text-center ${i < c.metrics.length - 1 ? "border-r border-border" : ""} bg-card/40`}
                  >
                    <p className="font-display text-2xl lg:text-3xl font-bold text-primary">{m.value}</p>
                    <p className="text-xs text-foreground/50 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-24 lg:pb-32 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Sticky sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky top-28 space-y-8">
                <div>
                  <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest mb-1">Kunde</p>
                  <p className="text-foreground font-medium">{c.client}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest mb-1">Branche</p>
                  <p className="text-foreground font-medium">{c.category}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest mb-1">Platform</p>
                  <p className="text-foreground font-medium">{c.platform}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest mb-1">Service</p>
                  <p className="text-foreground font-medium">{c.service}</p>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-9 space-y-20">

              {/* Om */}
              <motion.div
                className="rounded-2xl border border-border bg-card/40 p-8 lg:p-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-5">
                  Om {c.client}
                </h2>
                <p className="text-foreground/70 leading-relaxed text-lg">{c.om}</p>
              </motion.div>

              {/* Udfordringer */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {c.bodyImage ? (
                  <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-lg">
                    <img src={c.bodyImage} alt={`${c.client} billede`} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${c.color} opacity-60 border border-primary/10`} />
                )}
                <div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">Udfordringer</h2>
                  <p className="text-foreground/70 leading-relaxed">{c.udfordringer}</p>
                </div>
              </motion.div>

              {/* Løsningen */}
              <motion.div
                className="rounded-2xl border border-border bg-card/40 p-8 lg:p-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-5">Løsningen</h2>
                <p className="text-foreground/70 leading-relaxed text-lg mb-6">{c.loesning}</p>
                {c.loesningPoints && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {c.loesningPoints.map((pt) => (
                      <div key={pt.label} className="p-5 rounded-xl border border-primary/15 bg-primary/5">
                        <p className="font-display text-base font-bold text-primary mb-2">{pt.label}</p>
                        <p className="text-sm text-foreground/60 leading-relaxed">{pt.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Resultater */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">Resultater</h2>
                {c.resultater.map((section) => (
                  <div key={section.title} className="mb-8">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-foreground/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Final metrics */}
                <div className="mt-10 grid grid-cols-3 gap-0 border border-border rounded-xl overflow-hidden">
                  {c.metrics.map((m, i) => (
                    <div
                      key={m.label}
                      className={`p-5 text-center ${i < c.metrics.length - 1 ? "border-r border-border" : ""} bg-card/60`}
                    >
                      <p className="font-display text-2xl font-bold text-primary">{m.value}</p>
                      <p className="text-xs text-foreground/50 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Video Testimonial — Lumant only */}
              {c.slug === "lumant" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-primary/20 bg-primary/5 p-8 lg:p-10"
                >
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">Hvad kunden siger</h2>
                  <p className="text-foreground/60 mb-6">Se Lumants egen udtalelse om samarbejdet.</p>
                  <div className="rounded-xl overflow-hidden border border-primary/10 shadow-lg aspect-video bg-black">
                    <video
                      src={VIDEOS.lumantTestimonial}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}

              {/* Hvad vi lærte */}
              {c.hvadViLaerte && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">Hvad vi lærte</h2>
                  <div className="space-y-5">
                    {c.hvadViLaerte.map((insight, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-border bg-card/40">
                        <p className="font-display text-base font-bold text-primary mb-2">{insight.title}</p>
                        <p className="text-foreground/70 leading-relaxed">{insight.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Takeaway */}
              {c.takeaway && (
                <motion.div
                  className="rounded-2xl border border-primary/20 bg-primary/5 p-8 lg:p-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">Takeaway</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">{c.takeaway.intro}</p>
                  <ul className="space-y-2 mb-6">
                    {c.takeaway.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-foreground/80 font-medium">
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="text-foreground/60 leading-relaxed italic">{c.takeaway.outro}</p>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* See more cases */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Se <span className="text-primary">flere cases</span>
          </h2>
          <p className="text-foreground/60 mb-8 max-w-md mx-auto">
            Udforsk vores andre resultater og find inspiration til jeres næste kampagne.
          </p>
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline text-lg"
          >
            Alle cases <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default CaseDetail;
