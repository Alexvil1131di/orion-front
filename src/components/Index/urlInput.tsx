import DobleArrow from "../../assets/common/doubleArrow";

interface UrlInputProps {
  value: string;
  placeholder?: string;
  maxWidth?: string;
  height?: string;
  buttonType: "button" | "submit" | "reset" | undefined;
  onChange: (value: string) => void;
}

const UrlInput = ({
  value,
  placeholder,
  buttonType,
  onChange,
  height = "66px",
  maxWidth = "800px",
}: UrlInputProps) => {
  return (
    <div
      className="flex border py-2 gap-2 rounded-full px-6 w-full h-[86px] shadow-md bg-white "
      style={{ maxWidth, height }}
    >
      <input
        type="text"
        placeholder={placeholder}
        className=" text-[24px] w-full h-full bg-white"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <button type={buttonType}>
        <DobleArrow className=" fill-[#6041fe] stro stroke-[2px] w-6 h-6" />
      </button>
    </div>
  );
};

export default UrlInput;
