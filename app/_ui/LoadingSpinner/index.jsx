import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#C4A87A]/20 border-t-[#C4A87A] rounded-full animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
