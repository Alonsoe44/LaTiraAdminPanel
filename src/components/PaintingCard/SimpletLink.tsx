import { Link } from "react-router-dom";

interface SimpleLinkProps {
  text: string;
  path: string;
}
function SimpletLink({ text, path }: SimpleLinkProps) {
  return (
    <Link
      to={path}
      className="bg-blue-400 text-white py-2 rounded-sm w-32 px-12 mr-5"
    >
      {text}
    </Link>
  );
}

export default SimpletLink;
