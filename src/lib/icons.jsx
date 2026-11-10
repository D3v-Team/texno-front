import {
  BadgeCheck, Box, BrainCircuit, Briefcase, Building2, Clapperboard, Cloud, Coins, Cpu, Droplets, Factory,
  FileText, FlaskConical, Globe, GraduationCap, Hammer, Handshake, Landmark, Layers, Lightbulb, Lock, Megaphone,
  Monitor, PiggyBank, Presentation, Printer, Radar, Rocket, ScanEye, ShieldCheck, Shirt, ShoppingCart, Sprout,
  Stethoscope, Sun, Target, Thermometer, TrendingUp, Truck, Users, Wallet, Wheat, Wifi, Zap,
} from 'lucide-react';

const ICONS = {
  BadgeCheck, Box, BrainCircuit, Briefcase, Building2, Clapperboard, Cloud, Coins, Cpu, Droplets, Factory,
  FileText, FlaskConical, Globe, GraduationCap, Hammer, Handshake, Landmark, Layers, Lightbulb, Lock, Megaphone,
  Monitor, PiggyBank, Presentation, Printer, Radar, Rocket, ScanEye, ShieldCheck, Shirt, ShoppingCart, Sprout,
  Stethoscope, Sun, Target, Thermometer, TrendingUp, Truck, Users, Wallet, Wheat, Wifi, Zap,
};

export function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || Layers;
  return <Cmp {...props} />;
}

/* Brend ikonkalari (lucide'da Telegram yo'q) */
export function TelegramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.94 4.3a1.5 1.5 0 0 0-2.04-1.6L2.86 9.42c-1.2.47-1.13 2.2.1 2.57l4.2 1.27 1.6 5.1c.3.95 1.5 1.25 2.2.55l2.37-2.35 4.37 3.2c.87.64 2.1.17 2.33-.89L21.94 4.3ZM9.6 14.1l-.7 3.3-1.1-3.73 9.6-6.1-7.8 6.53Z" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.95v2.25H8v3h2.5V21h3Z" />
    </svg>
  );
}

export function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
};
