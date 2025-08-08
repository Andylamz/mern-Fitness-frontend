import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Loading({ message = "" }) {
  return (
    <div>
      <div className="text-center mt-40">
        <FontAwesomeIcon
          icon="fa-solid fa-spinner"
          className="text-4xl"
          spinPulse
        />
        <p className="mt-10 mx-auto text-sm max-w-[450px]">{message}</p>
      </div>
    </div>
  );
}

export default Loading;
