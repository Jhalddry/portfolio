import Image from "next/image";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section id="contact" className="relative my-12 py-24 px-4 xl:px-16 text-white">
      <div className="absolute inset-0 bg-blue-500 opacity-50 rounded-full w-96 h-96 filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4">Contactame</h2>
        <p className="text-gray-400 max-w-md">
          Si tienes alguna pregunta o simplemente quieres contactarme, no dudes en escribirme y ver mi trabajo.
        </p>
        <div className="flex items-center space-x-4 mt-6">
          <Link href="https://github.com/jhalddry" target="_blank">
            <div className="bg-gradient-to-r from-gray-200 to-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
              <Image src="/icons/Github.svg" width={24} height={24} alt="GitHub" className="cursor-pointer w-6 h-6" />
            </div>
          </Link>
          <Link href="https://www.linkedin.com/in/jhalddry/" target="_blank">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-md w-10 h-10 flex items-center justify-center">
              <Image src="/icons/Linkedin.svg" width={24} height={24} alt="LinkedIn" className="cursor-pointer w-6 h-6" />
            </div>
          </Link>
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-md w-9 h-9 flex items-center justify-center">
              <Image src="/icons/Gmail.svg" width={24} height={24} alt="Email" className="w-7 h-7" />
            </div>
            <span className="text-md ml-2 font-bold text-[#ADB7BE]">jhalddryg@gmail.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
