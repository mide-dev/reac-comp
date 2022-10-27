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

  // Handle outside mouse close
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

      document.addEventListener("mousedown", handleMouseClick);

      return () => document.removeEventListener("mousedown", handleMouseClick);
    }, [ref]);
  };

  // call the outside mouse close function
  detectMouseClick(mouseClickRef, buttonRef);

  // Arrow keys navigation
  const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPress] = useState(false);

    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPress(true);
      }
    }

    function upHandler({ key }) {
      if (key === targetKey) {
        setKeyPress(false);
      }
    }

    useEffect(() => {
      document.addEventListener("keydown", downHandler);
      document.addEventListener("keyup", upHandler);

      return () => {
        document.removeEventListener("keydown", downHandler);
        document.removeEventListener("keyup", upHandler);
      };
    });

    return keyPressed;
  };

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [navigate, setNavigate] = useState("");
  const [hovered, setHovered] = useState(undefined);

  // when down arrow pressed
  useEffect(() => {
    if (links.length && downPress) {
      setCursor((prevState) => (prevState > 0 ? prevState + 1 : prevState));
    }
  }, [downPress]);

  // when up arrow pressed
  useEffect(() => {
    if (links.length && upPress) {
      setCursor((prevState) =>
        prevState < links.length - 1 ? prevState - 1 : prevState
      );
    }
  }, [upPress]);

  // when Enter pressed
  useEffect(() => {
    if (links.length && enterPress) {
      setNavigate(links[cursor]);
    }
  }, [enterPress]);

  // on mouse hover
  useEffect(() => {
    if (links.length && hovered) {
      setCursor(links.indexOf(hovered));
    }
  }, [hovered]);

  // handling links display functionality as a seperate component
  // prettier-ignore
  // const DisplayLink = ({val, active, setNavigate, setHovered}) => {

  // }

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
                href={navigate}
                className={`${
                  val.disabled
                    ? "text-gray-400 cursor-default"
                    : "text-gray-800 cursor-pointer hover:bg-gray-300"
                  } 
                  ${i === cursor ? "active" : ""}
                  p-2 block`}
                onMouseEnter={() => (setHovered(val))}
                onMouseLeave={() => setHovered(undefined)}
                onClick = {() => {setNavigate(val.link)}}
              >
                {val.link}
                {/* <DisplayLink
                  val={val}
                  key={val.link}
                  // active={}
                  setNavigate={setNavigate}
                  setHovered={setHovered}
                /> */}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuDropdownCustom;
