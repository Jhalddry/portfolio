import Image from "next/image";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-12 px-4 xl:px-16 text-white flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-blue-500 opacity-50 rounded-full w-96 h-96 filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Contáctame</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Si tienes alguna pregunta o simplemente quieres contactarme, no dudes en escribirme y ver mi trabajo.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
          <Link href="https://github.com/jhalddry" target="_blank">
            <div className="bg-gray-200 p-3 rounded-full flex items-center justify-center">
              <Image src="/icons/Github.svg" width={28} height={28} alt="GitHub" className="text-gray-800" />
            </div>
          </Link>
          <Link href="https://www.linkedin.com/in/jhalddry/" target="_blank">
            <div className="bg-blue-600 p-3 rounded-full flex items-center justify-center">
              <Image src="/icons/Linkedin.svg" width={28} height={28} alt="LinkedIn" className="text-white" />
            </div>
          </Link>
        </div>
        <hr className="border-gray-700 md:mt-8 w-full mx-auto md:mx-0" />
        <div className="flex flex-col items-center mt-4 md:flex-row md:justify-center md:mt-0">
          <span className="text-md ml-2 font-bold text-[#ADB7BE] md:block mt-4 md:mt-4 md:ml-4">
            Jhalddryg@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
