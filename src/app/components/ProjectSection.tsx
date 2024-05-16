import ProjectCard from "./helpers/ProjectCard";

const projectsData = [
  {
    id: 1,
    title: "Tic Tac Toe",
    description:
      "Un juego clásico de Tic Tac Toe creado con JavaScript, HTML y CSS. Permite a dos jugadores jugar en una cuadrícula de 3x3, mostrando habilidades en desarrollo web, manejo de eventos y actualización dinámica de la interfaz.",
    image: "https://via.placeholder.com/300x200",
    url: "https://tic-tac-toe-jhalddry.netlify.app/",
    tag: ["All", "React", "CSS"],
  },
  {
    id: 2,
    title: "Pomodoro Timer",
    description:
      "Un temporizador Pomodoro desarrollado con React Native y Expo Go. Esta app ayuda a gestionar el tiempo de trabajo y descanso, ofreciendo una interfaz simple y fácil de usar. ",
    image: "https://via.placeholder.com/300x200",
    // url: "https://66442ec965508a41d251c757--pomodoro-native-jhalddry.netlify.app",
    tag: ["All", "React", "Native"],
  },
  {
    id: 3,
    title: "Pokemon Dashboard",
    description:
      "Un panel de control de Pokémon desarrollado con Next.js. Esta aplicación muestra información detallada sobre varios Pokémon, utilizando una interfaz moderna y reactiva. Incluye una sección de favoritos que mantiene el estado entre sesiones y un widget vinculado al counter.",
    image: "https://via.placeholder.com/300x200",
    // url: "https://pokemon-nextjs-jhalddry-jhalddrys-projects.vercel.app/",
    tag: ["All", "React", "Next.js"],
  },
  {
    id: 4,
    title: "Gif Searcher",
    description:
      "Una aplicación desarrollada en React para buscar y mostrar gifs.",
    image: "../../public/images/gifs.png",
    // url: "https://gif-searcher-jhalddry.netlify.app/",
    tag: ["All", "React", "CSS"],
  },
];

const ProjectSection = () => {
  <>
    <h2>Mis Proyectos</h2>
    <div>
      {projectsData.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          image={project.image}
        />
      ))}
    </div>
  </>;
};

export default ProjectSection;
