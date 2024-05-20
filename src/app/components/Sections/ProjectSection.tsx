"use client";

import { useState } from "react";
import ProjectCard from "../helpers/ProjectCard";
import projectsData from "../helpers/projectsData";
import ProjectTag from "../helpers/ProjectTag";

const ProjectSection = () => {
  const [tag, setTag] = useState("Todos");

  const handleTagClick = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project: any) => project.tag.includes(tag));

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4">
        Mis Proyectos
      </h2>
      <div className="text-white flex flex-wrap justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={() => handleTagClick("Todos")}
          name="Todos"
          isSelected={tag === "Todos"}
        />
        <ProjectTag
          onClick={() => handleTagClick("React")}
          name="React"
          isSelected={tag === "React"}
        />
        <ProjectTag
          onClick={() => handleTagClick("Native")}
          name="Native"
          isSelected={tag === "Native"}
        />
        <ProjectTag
          onClick={() => handleTagClick("NextJS")}
          name="NextJS"
          isSelected={tag === "NextJS"}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project: any) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            gitUrl={project.gitUrl}
            previewUrl={project.url}
            tag={project.tag}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
