import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Richard Bernard — Product Designer & Developer',
  description: 'I design and build digital products that turn complex problems into simple experiences.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
