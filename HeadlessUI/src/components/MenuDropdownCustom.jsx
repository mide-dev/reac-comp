import { useState, useEffect } from "react";

const MenuDropdownCustom = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const escHandler = (event) => {
      console.log(event);
    };
  });

  return (
    <div className="flex-1">
      <h1 className="pb-6 self-center underline text-gray-100 font-bold">
        Custom
      </h1>
      <div className="relative">
        <button
          className="text-white font-semibold mb-2 
            px-4 py-2 bg-black bg-opacity-30 rounded-md"
          onClick={() => setOpen(!open)}
        >
          Options
        </button>
        <ul
          className={`${
            open ? "flex" : "hidden"
          } absolute bg-white p-2  flex-col rounded-md`}
        >
          <li className="pb-4">
            <a>Account settings</a>
          </li>
          <li className="pb-4">
            <a>Documentation</a>
          </li>
          <li>
            <a>Invite a friend (coming soon!)</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuDropdownCustom;
