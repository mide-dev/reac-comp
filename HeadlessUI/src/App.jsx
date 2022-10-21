import MenuDropdown from "./components/MenuDropdown";
import MenuDropdownCustom from "./components/MenuDropdownCustom";
import Navbar from "./components/Navbar";
import MyDropdown from "./components/MyDropdown";

const App = () => {
  return (
    <div className="flex flex-col">
      <div className="flex mb-16">
        <MenuDropdown />
        <MenuDropdownCustom />
        <MyDropdown />
      </div>
      <Navbar />
    </div>
  );
};

export default App;
