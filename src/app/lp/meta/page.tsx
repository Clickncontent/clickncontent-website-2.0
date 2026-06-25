import LandingMeta from '@/views/LandingMeta';

export const metadata = {
  title: "Video til Meta annoncer der sælger",
  description:
    "Vi bygger video, der er skabt til at performe i betalte Meta-annoncer. Flere kunder, ikke bare visninger. Ansøg om en uforpligtende samtale.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/lp/meta" },
};

export default function Page() {
  return <LandingMeta />;
}
