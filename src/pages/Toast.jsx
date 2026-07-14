import React from "react";
import { Bell } from "lucide-react";

function Toast({ notification }) {
  return (
    <div className="fixed right-2 top-2 z-50 ">
      <div className="flex  items-start gap-3  w-80 rounded-md
       bg-blue-700 text-white shadow-2xl p-6 border-l-2 border-blue-500">
        <div className="bg-blue-500 p-2 rounded-full">
          <Bell size={20} />
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-lg">Notification</h2>
          <p className="text-gray-300 text-sm first-letter:uppercase mt-1">
            {notification}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Toast;