"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import ParticlesComponent from '../components/Particles';
import photos from '../components/photos';

export default function Home() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOpacity, setPageOpacity] = useState(0);
    const [modalOpacity, setModalOpacity] = useState(0);

    useEffect(() => {
        const fadeInTimeout = setTimeout(() => {
            setPageOpacity(1);
        }, 100);

        return () => clearTimeout(fadeInTimeout);
    }, []);

    const openModal = (photo) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
        setModalOpacity(0);
        setTimeout(() => setModalOpacity(1), 100);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
        setIsModalOpen(false);
    };

    const Modal = ({ photo, onClose }) => {
        if (!photo) return null;

        const handleModalClick = (event) => {
            if (event.target === event.currentTarget) {
                onClose();
            }
        };

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                onClick={handleModalClick}
                style={{ opacity: modalOpacity, transition: 'opacity 300ms ease-in-out' }}
            >
                <div className="relative">
                    <button
                        className="text-white text-2xl absolute top-2 right-2 transition-colors duration-300 ease-in-out hover:text-gray-300"
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
        <div className="min-h-screen" style={{ opacity: pageOpacity, transition: 'opacity 2000ms ease-in-out' }}>
            <Head>
                <title>Erwan Mouton</title>
                <meta name="description" content="Photographer based in Paris" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col justify-center text-center h-screen">
            <header className="sticky justify-between w-full">
                <a href="#" className="text-white hover:text-gray-300 mr-5">Projects</a>
                <a href="#" className="text-white hover:text-gray-300 ">Contact</a>
            </header>

            {/* Section pour le nom et le prénom */}
            <section className="flex flex-col items-center justify-center text-center">
                <h1 className="text-6xl font-bold text-white">Erwan Mouton</h1>
                <p className="mt-3 text-white">Photographer, based in Paris</p>
                <ParticlesComponent id="particles" />
            </section>
            </div>
            {/* Section pour la galerie de photos */}
            <section className="w-full bg-black py-4 border-t border-gray-800" style={{ opacity: pageOpacity, transition: 'opacity 500ms ease-in-out' }}>
                <div className="container mx-auto ">
                    <div style={{ columnCount: 5, columnGap: '1rem' }}>
                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                style={{ marginBottom: '1rem' }}
                                onClick={() => openModal(photo)}
                                className="transition-transform duration-300 ease-in-out hover:scale-105"
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
            </section>

            <footer className="flex justify-center w-full py-8 border-t border-gray-800 bg-black">
                <p className="text-white">© 2024 hctr. All rights reserved.</p>
            </footer>

            {/* Affichage conditionnel de la modale */}
            {isModalOpen && (
                <Modal photo={selectedPhoto} onClose={closeModal} />
            )}
        </div>
    );
}
