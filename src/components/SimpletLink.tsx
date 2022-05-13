import { Link } from "react-router-dom";

interface SimpleLinkProps {
  text: string;
  path: string;
}
function SimpletLink({ text, path }: SimpleLinkProps) {
  return (
    <Link
      to={path}
      className="bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-sm  px-12 mr-5 text-center"
    >
      {text}
    </Link>
  );
}

export default SimpletLink;
