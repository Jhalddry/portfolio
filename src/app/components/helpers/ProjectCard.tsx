import { CodeBracketIcon, EyeIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ title, description, image, gitUrl, previewUrl }: any) => {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg group">
      <div className="relative h-72 w-full">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-[#181818] bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex space-x-4">
            <Link
              href={gitUrl}
              className="h-14 w-14 border-2 rounded-full border-[#ADB7BE] hover:border-white flex items-center justify-center"
              target="_blank"
            >
              <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] transition-colors duration-300 group-hover:text-white" />
            </Link>
            <Link
              href={previewUrl}
              className="h-14 w-14 border-2 rounded-full border-[#ADB7BE] hover:border-white flex items-center justify-center"
              target="_blank"
            >
              <EyeIcon className="h-10 w-10 text-[#ADB7BE] transition-colors duration-300 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-white bg-[#181818] py-6 px-4 rounded-b-xl mt-3">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
