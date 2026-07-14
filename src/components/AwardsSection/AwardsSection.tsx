import {
  Trophy,
  Newspaper,
  Gem,
  ShieldCheck,
  Settings,
  Headphones,
} from "lucide-react";
import { awards } from "@/data/awards";
import styles from "./AwardsSection.module.css";

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy size={24} />,
  Newspaper: <Newspaper size={24} />,
  Gem: <Gem size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  Settings: <Settings size={24} />,
  HeadphonesIcon: <Headphones size={24} />,
};

export default function AwardsSection() {
  return (
    <section className={styles.section} id="awards">
      <div className="container">
        <div className={styles.sectionTitleWrap}>
          <span className={styles.sectionLabel}>Why Choose Us</span>
          <h2 className={styles.sectionTitle}>
            Excellence, By Every Measure
          </h2>
          <div className={styles.goldLine} />
        </div>
      </div>

      <div className={`container`}>
        <div className={styles.grid}>
          {awards.map((award) => (
            <div key={award.id} className={styles.card} id={`award-${award.id}`}>
              <div className={styles.iconWrap} aria-hidden="true">
                {iconMap[award.icon]}
              </div>
              <h3 className={styles.cardTitle}>{award.title}</h3>
              <p className={styles.cardDesc}>{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
