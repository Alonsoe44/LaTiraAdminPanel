interface SimpleButtonProps {
  color: string;
  buttonAction: () => void;
  text: string;
}
function SimpleButton({ color, buttonAction, text }: SimpleButtonProps) {
  return (
    <button
      type="button"
      className={`${color} p-1 rounded-sm w-32 mr-5`}
      onClick={() => buttonAction()}
    >
      {text}
    </button>
  );
}

export default SimpleButton;
