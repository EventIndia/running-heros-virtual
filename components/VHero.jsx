import VHeroSlider from "@/components/VHeroSlider";

export default function VHero({ slides }) {
  return (
    <section className="vHeroSection">
      <div className="vContainer">
        <VHeroSlider slides={slides} />
      </div>
    </section>
  );
}
