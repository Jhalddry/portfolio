"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import TabButton from "./helpers/TabButton";

const TAB_DATA = [
  {
    title: "Habilidades",
    id: "habilidades",
    content: (
      <ul className="list-disc pl-2">
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>Native</li>
        <li>Next.js</li>
        <li>Tailwind</li>
        <li>Git</li>
        <li>GitHub</li>
      </ul>
    ),
  },
  {
    title: "Educacion",
    id: "educacion",
    content: (
      <ul className="list-disc pl-2">
        <li>Educacion 1</li>
        <li>Educacion 2</li>
        <li>Educacion 3</li>
      </ul>
    ),
  },
  {
    title: "Certificaciones",
    id: "certificaciones",
    content: (
      <ul className="list-disc pl-2">
        <li>ReactJS: De cero a experto</li>
        <li>JavaScript: De cero a experto</li>
        <li>NextJS - Proximamente</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("habilidades");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        {/* <Image src="/images/develop.jpg" width={200} height={200} alt="image" /> */}
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bol text-white mb-4">Sobre Mi</h2>
          <p className="text-base md:text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
            consequatur aspernatur perspiciatis sapiente corrupti, fugit
            quisquam nam animi non reprehenderit ipsa temporibus possimus autem
            nostrum qui laborum. Non, reprehenderit iste!
          </p>
          <div className="flex flex-row mt-8">
            <TabButton
              selectTab={() => handleTabChange("habilidades")}
              active={tab === "habilidades"}
            >
              {" "}
              Habilidades{" "}
            </TabButton>

            <TabButton
              selectTab={() => handleTabChange("educacion")}
              active={tab === "educacion"}
            >
              {" "}
              Educacion{" "}
            </TabButton>

            <TabButton
              selectTab={() => handleTabChange("certificaciones")}
              active={tab === "certificaciones"}
            >
              {" "}
              Certificaciones{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default AboutSection;
