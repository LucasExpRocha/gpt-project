export const SavedMessage = () => {
  return (
    <div className="bg-green-500 text-white p-4 rounded-lg flex items-center space-x-2 absolute z-50 top-5 right-5">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <span>Salvo</span>
    </div>
  );
};
