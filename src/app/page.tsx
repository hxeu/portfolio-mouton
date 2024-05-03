"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import ParticlesComponent from '../components/Particles';
import photos from '../components/photos';

export default function Home() {
    // États locaux pour la photo sélectionnée et l'état de la modale
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction pour ouvrir la modale
    const openModal = (photo: any) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
    };

    // Fonction pour fermer la modale
    const closeModal = () => {
        setSelectedPhoto(null);
        setIsModalOpen(false);
    };

    // Composant modale personnalisé
    const Modal = ({ photo, onClose }: { photo: any; onClose: () => void }) => {
        if (!photo) return null;

        const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
            // Fermer la modale si l'utilisateur clique en dehors de l'image
            if (event.target === event.currentTarget) {
                onClose();
            }
        };

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                onClick={handleModalClick}
            >
                <div className="relative">
                    <button
                        className="absolute top-2 right-2 text-white text-2xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width || 800}
                        height={photo.height || 600}
                        layout="intrinsic"
                        objectFit="contain"
                        className="rounded-lg"
                    />
                </div>
            </div>
        );
    };

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
                {/* Galerie de photos */}
                <div style={{ columnCount: 5, columnGap: '1rem' }}>
                    {photos.map((photo, index) => (
                        <div
                            key={photo.id}
                            style={{ marginBottom: '1rem' }}
                            onClick={() => openModal(photo)}
                        >
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

            {/* Affichage conditionnel de la modale */}
            {isModalOpen && (
                <Modal photo={selectedPhoto} onClose={closeModal} />
            )}
        </div>
    );
}
