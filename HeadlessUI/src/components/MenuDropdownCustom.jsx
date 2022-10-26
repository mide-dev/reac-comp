import { useState, useEffect, useRef } from "react";

const links = [
  { link: "Account Settings" },
  { link: "Documentation" },
  { link: "Support" },
  { link: "Invite a friend (coming soon!)", disabled: true },
];

const MenuDropdownCustom = () => {
  const [open, setOpen] = useState(false);
  const mouseClickRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle ESC key press
  useEffect(() => {
    const detectKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", detectKeyDown);
  });

  // Handle outside mouse click
  const detectMouseClick = (ref, button) => {
    useEffect(() => {
      function handleMouseClick(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          !button.current.contains(event.target)
        ) {
          setOpen(false);
        }
      }

      // bind event listner
      document.addEventListener("mousedown", handleMouseClick);

      return () => document.removeEventListener("mousedown", handleMouseClick);
    }, [ref]);
  };

  // call the click function
  detectMouseClick(mouseClickRef, buttonRef);

  return (
    <div className="flex-1">
      <h1 className="pb-6 self-center underline text-gray-100 font-bold">
        Custom
      </h1>
      <div className="relative">
        <button
          ref={buttonRef}
          className="text-white font-semibold mb-2 
            px-4 py-2 bg-black bg-opacity-30 rounded-md"
          onClick={() => setOpen(!open)}
        >
          Options
        </button>
        <ul
          ref={mouseClickRef}
          className={`${
            open ? "flex" : "hidden"
          } absolute bg-white flex-col rounded-md font-semibold text-sm`}
        >
          {links.map((val, i) => (
            <li
              key={val.link}
              className={`${i === links.length - 1 ? "mb-1" : "mb-0"} my-1`}
            >
              <a
                href="#"
                className={`${
                  val.disabled
                    ? "text-gray-400 cursor-default"
                    : "text-gray-800 cursor-pointer hover:bg-gray-300"
                } p-2 block`}
              >
                {val.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuDropdownCustom;
