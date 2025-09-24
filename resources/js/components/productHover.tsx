import React, { useRef, useEffect } from 'react';

interface ProductImage {
  main: string;
  leftThird: string;
  middleThird: string;
  rightThird: string;
}

interface ProductHoverImageProps {
  product: ProductImage;
  alt: string;
  className?: string;
}

const ProductHoverImage: React.FC<ProductHoverImageProps> = ({ product, alt, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Ensure initial image is set
    image.style.backgroundImage = `url(${product.main})`;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      let newImage = product.main;

      if (x < width / 3) {
        newImage = product.leftThird;
      } else if (x < (width * 2) / 3) {
        newImage = product.middleThird;
      } else {
        newImage = product.rightThird;
      }

      image.style.backgroundImage = `url(${newImage})`;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', () => {
      image.style.backgroundImage = `url(${product.main})`;
    });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', () => {});
    };
  }, [product.main, product.leftThird, product.middleThird, product.rightThird]);

  return (
    <div
      ref={containerRef}
      className={`product-container cursor-pointer group ${className}`}
    >
      <div
        ref={imageRef}
        className="w-full h-[300px] bg-cover bg-center transition-[background-image] duration-300 group-hover:duration-100"
        style={{ backgroundImage: `url(${product.main})` }}
        role="img"
        aria-label={alt}
      />
      <div className={`bg-[rgba(0,0,0,0.8)] text-white flex justify-center items-center text-[14px] h-10 absolute w-full transition duration-300 -translate-y-10' : 'translate-y-0 quick-view`}>
            <p>Quick view</p>
        </div>
    </div>
  );
};

export default ProductHoverImage;