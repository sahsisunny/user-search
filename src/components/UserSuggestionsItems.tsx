import Image from 'next/image';

interface UserSuggestionsItemsProps {
  name: string;
  image: string;
  email: string;
  searchCharacters: string;
  onClick: () => void;
  isSelected: boolean;
  tabIndex?: number;

}

export const UserSuggestionsItems = ({
  name,
  image,
  email,
  searchCharacters,
  onClick,
  isSelected,
  tabIndex,
}: UserSuggestionsItemsProps) => {
  return (
    <div
      className={`flex items-center gap-2 w-full p-2 cursor-pointer hover:bg-gray-100 ${
        isSelected ? "border-2 border-black" : ""
      }`}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      <Image
        src={image}
        width={30}
        height={30}
        alt="image"
        className="rounded-full"
      />
      <div className="flex flex-row justify-between items-center gap-2">
        <span className="flex gap-2">
          {name.split(" ").map((word, wordIndex) => (
            <span key={wordIndex}>
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={`text-xs ${
                    char === searchCharacters[charIndex] ? "text-blue-500" : ""}`
                  }
                >
                  {char}
                </span>
              ))}
              {wordIndex < name.split(" ").length - 1 && " "}
            </span>
          ))}
        </span>
        <span className="text-sm text-gray-400">{email}</span>
      </div>
    </div>
  );
};
