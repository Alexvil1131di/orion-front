const NonLoggedInInfo = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-11 lg:mt-11">
      <div className="flex flex-col md:flex-row  items-center justify-center lg:justify-start gap-4">
        <p className="max-w-[450px] text-[24px] md:text-justify">
          Unlock More Power with Your Short Links!. Join us today and take your
          link management to the next level!
        </p>
        <button
          className="bg-[#6041fe] bg-gradient-to-r px-4 py-2 hover:bg-[#5331fc] 
    rounded-full text-white shadow-md shadow-[#6141fe6f] h-[46px] w-full md:w-[200px] "
        >
          Sign Up
        </button>
      </div>
      <img
        className="border rounded-md w-full max-w-[600px] lg:w-fit"
        src="/urlShort.webp"
        alt=""
      />
    </div>
  );
};
export default NonLoggedInInfo;
