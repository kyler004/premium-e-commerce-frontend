import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

    return (
        <div className="flex gap-4">

            {/* Thumbnail Strip — left side */}
            <div className="flex flex-col gap-2">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-20 w-20 shrink-0 overflow-hidden border-2 transition-all ${
                            i === activeIndex
                                ? 'border-accent'
                                : 'border-border opacity-50 hover:opacity-100'
                        }`}
                    >
                        <img
                            src={img}
                            alt={`${productName} view ${i + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 overflow-hidden bg-[#0d0d0d] aspect-square">
                <img
                    key={activeIndex}
                    src={images[activeIndex]}
                    alt={productName}
                    className="h-full w-full object-cover fade-in-element"
                />

                {/* Arrows — only if more than 1 image */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 border border-border
                         bg-black/60 p-2 text-white backdrop-blur-sm
                         hover:border-accent hover:text-accent transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 border border-border
                         bg-black/60 p-2 text-white backdrop-blur-sm
                         hover:border-accent hover:text-accent transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </>
                )}

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-1 transition-all ${
                                i === activeIndex
                                    ? 'w-6 bg-accent'
                                    : 'w-1.5 bg-gray-600 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ImageGallery;