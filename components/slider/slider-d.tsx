'use client';

import { cn } from '@/libs/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

type SliderProps = {
  images: string[];
  heightInRem?: number;
  widthInRem?: number;
};

const Slider = ({ images, heightInRem, widthInRem }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(images.length - 1);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!isDragging) {
  //       nextSlide();
  //     }
  //   }, 3000);
  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const distance = e.clientX - startPosition;
    if (distance > 50) {
      previousSlide();
      setIsDragging(false);
    } else if (distance < -50) {
      nextSlide();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const distance = e.touches[0].clientX - startPosition;
    if (distance > 50) {
      previousSlide();
      setIsDragging(false);
    } else if (distance < -50) {
      nextSlide();
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const sliderElement = sliderRef.current;
      sliderElement.addEventListener('mousemove', handleMouseMove);
      sliderElement.addEventListener('mouseup', handleMouseUp);
      sliderElement.addEventListener('mouseleave', handleMouseUp);
      sliderElement.addEventListener('touchmove', handleTouchMove);
      sliderElement.addEventListener('touchend', handleTouchEnd);
      return () => {
        sliderElement.removeEventListener('mousemove', handleMouseMove);
        sliderElement.removeEventListener('mouseup', handleMouseUp);
        sliderElement.removeEventListener('mouseleave', handleMouseUp);
        sliderElement.removeEventListener('touchmove', handleTouchMove);
        sliderElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <div
      className={cn('relative', {
        'h-full': !heightInRem,
      })}
      style={{
        height: `${heightInRem}rem` || '100%',
        width: `${widthInRem}rem` || '100%',
      }}
    >
      <div
        id='slider'
        ref={sliderRef}
        className='group relative h-full w-full overflow-hidden rounded-md bg-blue-400'
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          id='wrapper'
          className='slide-animation relative flex h-full w-full'
          style={{ transform: `translateX(${currentIndex * 100}%)` }}
        >
          {images.map((url) => (
            <div
              key={url}
              id='slide'
              className='relative flex h-full w-full flex-[0_0_100%] items-center justify-center'
            >
              <Image
                id='image'
                alt='url'
                src={url}
                fill
                priority
                sizes='100vw'
                className='relative h-full w-full object-cover hover:cursor-grab'
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className='absolute bottom-3 left-3 flex gap-3 opacity-0 transition-opacity group-hover:opacity-100'>
          <button
            className='size-10 rounded-full bg-white opacity-65 transition-opacity hover:opacity-100'
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
          >
            <ChevronRight className='absolute bottom-[8px] right-[7px]' />
          </button>
          <button
            className='relative size-10 rounded-full bg-white opacity-65 transition-opacity hover:opacity-100'
            onClick={(e) => {
              e.preventDefault();
              previousSlide();
            }}
          >
            <ChevronLeft className='absolute bottom-[8px] right-[9px]' />
          </button>
        </div>

        <div className='absolute bottom-5 right-5 flex items-center gap-x-2'>
          {images.map((dot, index) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(index);
              }}
              key={dot}
              className={cn(
                'control-animation inline-block size-2 cursor-pointer rounded-full bg-white shadow-sm',
                {
                  'cursor-default rounded-xl bg-[#35b5ff] px-[8px]':
                    index === currentIndex,
                },
              )}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
