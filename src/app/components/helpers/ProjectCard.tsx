import React from "react";

type Props = {
  title: String;
  description: String;
  image: String;
};

const ProjectCard = ({ title, description, image }: Props) => {
  return (
    <div>
      <div
        className="h-52 md:h-72"
        style={{ background: `url(${image})`, backgroundSize: "cover" }}
      ></div>
      <div className="text-white">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
