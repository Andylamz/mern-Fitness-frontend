import { useNavigate } from "react-router-dom";

function SubmitBtn({ handleSubmit, btnText }) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/dashboard");
  }
  return (
    <form
      className="flex flex-col gap-3 w-[245px] text-center "
      onSubmit={handleSubmit}
    >
      <button className="py-3 bg-[#151824] w-full hover:bg-[#c9b26c] cursor-pointer duration-500 rounded-md">
        {btnText}
      </button>
      <div
        className="py-3 bg-[#151824] w-full hover:bg-[#c9b26c] cursor-pointer duration-500 rounded-md"
        onClick={handleNavigate}
      >
        Back
      </div>
    </form>
  );
}

export default SubmitBtn;
