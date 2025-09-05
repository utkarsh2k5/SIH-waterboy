import Header from "./components/header"; 
import Hero from "./components/Hero"; 
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";
import Background from "./components/Background"; 
import CursorFollower from "./components/3D-image"; 

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500, 
      once: true, 
    });
  }, []);

  return (
    <main>
      <Background /> {/* Reusable background and blur */}
      <Header />
      <Hero />
    </main>
  );
}

// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from "react";
// import Background from "./components/Background";
// import CursorFollower from "./components/3D-image";


// // Import your local image file. This is crucial in Vite/React
// export default function App() {
//   useEffect(() => {
//     AOS.init({
//       duration: 1500,
//       once: true,
//     });
//   }, []);

//   return (
//     <main>
//       {/* Reusable background and blur */}
//       <Background />
//       <Header />
//       <Hero />
      
//       {/* Render the CursorFollower component with the image URL */}
//       <CursorFollower imageUrl={"/3D-ROBOT.PNG"} />
//     </main>
//   );
// }