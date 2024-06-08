import Slider from '@/components/slider/slider-d';

const images = [
  'https://movie-app.storage.iran.liara.space/3444.jpg',
  'https://movie-app.storage.iran.liara.space/48831.jpg',
  'https://movie-app.storage.iran.liara.space/car-5725327_640.jpg',
  'https://movie-app.storage.iran.liara.space/pexels-alexgtacar-745150-1592384.jpg',
];

const HomePage = () => {
  return <Slider images={images} heightInRem={30} />;
};

export default HomePage;
