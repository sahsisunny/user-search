import Image from 'next/image';

interface UserItemProps {
  name: string;
  image: string;
  onClose: () => void;
  tabIndex?: number;
}

export default function UserItem({ name, image, onClose, tabIndex }: UserItemProps) {
  return (
    <div className="flex justify-center items-center gap-2 border-2 bg-gray-100  rounded-full w-fit "
      tabIndex={tabIndex}
    >
      <Image
        src={image}
        width={30}
        height={30}
        alt="image"
        className="rounded-full"
      />
      <span>{name}</span>
      <button className="rounded-full p-1 mr-1 hover:bg-gray-300"
        onClick={onClose}
      >
        <Image src="/close.svg" width={15} height={15} alt="image" />
      </button>
    </div>
  );
}
