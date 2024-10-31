import IconButton from "../IconButton";

type Props = {
  isActive: boolean;
  onClick: () => void;
  currentTool: 'note' | null;
};

export default function NoteButton({ isActive, onClick }: Props) {
  return (
    <IconButton isActive={isActive} onClick={onClick} tooltip="Add new sticky">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "none" : "currentColor"}
        strokeWidth={isActive ? "0" : "2"}
        className="w-8 h-8"
      >
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
      </svg>
    </IconButton>
  );
}