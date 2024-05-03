import NavLink from "./NavLink";

export const MenuOverlay = ({ links }: { links: { path: string; title: string }[] }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink path={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};
