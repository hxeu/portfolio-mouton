// pages/index.js
"use client";
import Head from "next/head";
import Image from "next/image";
import 'tailwindcss/tailwind.css';
import ParticlesComponent from "../components/Particles";
import photos from '../components/photos';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Erwan Mouton</title>
        <meta name="description" content="Photographer based in Paris" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between w-full px-10 py-8">
        <a href="#" className="text-white hover:text-gray-300">Projects</a>
        <a href="#" className="text-white hover:text-gray-300">Contact</a>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-white">Erwan Mouton</h1>
        <p className="mt-3 text-white">Photographer, based in Paris</p>
        <ParticlesComponent id="particles"/>
      </main>

      <div className="container mx-auto p-4">
        {/* Masonry Grid */}
        <div style={{ columnCount: 5, columnGap: '1rem' }}>
          {photos.map((photo) => (
            <div key={photo.id} style={{ marginBottom: '1rem' }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={200}
                height={200}
                layout="responsive"
                objectFit="cover"
                className="rounded-md w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="flex justify-center w-full py-8 border-t border-gray-800">
        <p className="text-white">© 2024 hctr. All rights reserved.</p>
      </footer>
    </div>
  );
}
