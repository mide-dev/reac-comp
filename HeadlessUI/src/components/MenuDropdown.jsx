import { Menu } from "@headlessui/react";

function MenuDropdown() {
  return (
    <div className="flex flex-1 flex-col max-w-[300px]">
      <h1 className="pb-6 self-center underline text-gray-100 font-bold">
        Refactored
      </h1>
      <div className="flex flex-col max-w-[14rem] items-end">
        <Menu as="div" className="relative">
          <Menu.Button
            className=" text-white font-semibold mb-2 
            px-4 py-2 bg-black bg-opacity-30 rounded-md"
          >
            Options
          </Menu.Button>
          <Menu.Items className="absolute bg-white p-2 flex flex-col rounded-md">
            <Menu.Item className="pb-4">
              {({ active }) => (
                <a
                  className={`${
                    active ? "bg-blue-500 text-white" : "bg-white text-black"
                  }`}
                  href="/account-settings"
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item className="pb-4">
              {({ active }) => (
                <a
                  className={`${active && "bg-blue-500"}`}
                  href="/account-settings"
                >
                  Documentation
                </a>
              )}
            </Menu.Item>
            <Menu.Item disabled>
              <span className="opacity-75">Invite a friend (coming soon!)</span>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}

export default MenuDropdown;
