function AddBtnComponenet({ btnText, title, description }) {
  return (
    <div className="flex justify-center bg-[#151824] text-[#6572aa] h-full py-5 hover:bg-[#c9b26c] cursor-pointer transition-colors duration-300 rounded-md">
      <div className="flex flex-col justify-between text-center py-6 px-1">
        <h1>{title}</h1>
        <p className="flex-1 text-[#45485d] text-sm mt-3">{description}</p>
        <button className="cursor-pointer text-sm py-2 roudned-md text-[#45485d] ">
          {btnText}
        </button>
      </div>
    </div>
  );
}

export default AddBtnComponenet;
