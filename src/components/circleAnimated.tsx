export const CircleAnimated = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-2 text-white inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 01-2-2.736H0c0 2.908 1.162 5.595 3.05 7.537l1.414-1.414zM12 20c-3.681 0-7.06-1.432-9.599-3.802l-1.41 1.415A11.963 11.963 0 0012 24a11.963 11.963 0 008.599-3.387l-1.41-1.415A15.929 15.929 0 0112 20zm5.364-3.477l1.414 1.414A7.962 7.962 0 0024 12h-4a7.96 7.96 0 01-2.735 2z"
      />
    </svg>
  );
};
