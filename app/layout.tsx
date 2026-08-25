import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] });
export const metadata: Metadata = { title: 'FHG Explained | Allen Samuel', description: 'A guided, transparent introduction to FHG with Allen Samuel.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${inter.variable} ${manrope.variable}`}>{children}</body></html>; }
