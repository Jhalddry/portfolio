import { AnimationType } from "../helpers/AnimationType";

export const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6D8F7] via-[#1ABC9C] to-[#3b3f47]">
              Hola, Soy{" "}
            </span>
            <br />
            <AnimationType />
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl mb-4">
            Estoy en busca de nuevas oportunidades laborales. No dudes en contactarme.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="block px-0.5 py-0.5 w-full sm:w-fit rounded-full bg-white hover:bg-slate-200 text-black"
            >
              <span className="block bg-[#fff] hover:bg-slate-200 rounded-full px-5 py-2 text-black font-medium">
                Contactame
              </span>
            </a>
            <a
              href="/download/jhalddry_cv.pdf" // Reemplaza con la ruta correcta a tu archivo PDF
              download="jhalddry_cv.pdf" // Nombre con el que se descargará el archivo
              className="block px-0.5 py-0.5 w-full sm:w-fit rounded-full bg-gradient-to-br from-[#C6D8F7] via-[#1ABC9C] to-[#3b3f47] hover:bg-slate-800 text-white"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2 font-medium">
                Descargar CV
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
