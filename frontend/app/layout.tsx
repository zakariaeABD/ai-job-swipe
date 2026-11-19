import './globals.css';
export const metadata = { title: 'AI Job Swipe', description: 'Discover jobs and avoid unverified listings' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}