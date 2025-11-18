// "use client";

// import React from "react";
// import { useParams } from "next/navigation";
// import AIChat from "@/components/AIChat";
// import { teachers } from "../data";

// export default function TeacherProfile() {
//   const { id } = useParams();
//   const teacher = teachers.find((t) => t.id === id);

//   if (!teacher) return <p className="text-center mt-10 text-red-500">Teacher not found</p>;

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
//       {/* Left: Teacher info */}
//       <div className="md:w-1/3 bg-white/90 shadow-lg p-6 m-4 rounded-xl flex flex-col items-center md:items-start">
//         <img src={teacher.avatar} alt={teacher.name} className="w-32 h-32 rounded-full object-cover border-2 border-orange-600 mb-4" />
//         <h2 className="text-2xl font-semibold text-orange-600">{teacher.name}</h2>
//         <p className="text-gray-600 mt-1">{teacher.subjects.en}</p>
//         <p className="text-gray-500 mt-2">{teacher.bios.en}</p>
//       </div>

//       {/* Right: AI Chat */}
//       <div className="md:flex-1 bg-white/90 shadow-lg p-4 m-4 rounded-xl">
//         <h3 className="text-lg font-semibold text-orange-600 mb-2">Chat with {teacher.name}</h3>
//         <AIChat
//           teachers={[
//             {
//               id: teacher.id,
//               name: teacher.name,
//               avatar: teacher.avatar,
//               subject: teacher.subjects.en,
//               bio: teacher.bios.en,
//             },
//           ]}
//         />
//       </div>
//     </div>
//   );
// }















// app/teachers/[id]/page.tsx
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import AIChat from "@/components/AIChat";
import { teachers } from "../data";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Globe } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  avatar: string;
  subjects: { uz: string; ru: string; en: string };
  bios: { uz: string; ru: string; en: string };
}

const translations = {
  uz: { teacherProfile: "O'qituvchi profili" },
  ru: { teacherProfile: "Профиль учителя" },
  en: { teacherProfile: "Teacher Profile" },
};

export default function TeacherProfilePage() {
  const { id } = useParams();
  const teacher = teachers.find((t) => t.id === id);
  const [language, setLanguage] = useState<"uz" | "ru" | "en">("en");
  const t = translations[language];

  if (!teacher)
    return (
      <p className="text-center mt-10 text-red-500 text-lg font-medium">
        Teacher not found
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      {/* Header with language switch */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-600">{t.teacherProfile}</h1>
        <Select
          value={language}
          onValueChange={(v) => setLanguage(v as "uz" | "ru" | "en")}
        >
          <SelectTrigger className="w-20">
            <Globe className="w-4 h-4 text-orange-600" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uz">UZ</SelectItem>
            <SelectItem value="ru">RU</SelectItem>
            <SelectItem value="en">EN</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Teacher Info */}
        <div className="md:w-1/3 bg-white/90 shadow-lg rounded-xl p-6 flex flex-col items-center md:items-start">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-orange-600 mb-4"
          />
          <h2 className="text-2xl font-semibold text-orange-600">{teacher.name}</h2>
          <p className="text-gray-600 mt-1">{teacher.subjects[language]}</p>
          <p className="text-gray-500 mt-2">{teacher.bios[language]}</p>
        </div>

        {/* Right: AI Chat */}
        <div className="md:flex-1 bg-white/90 shadow-lg rounded-xl p-4">
          <h3 className="text-lg font-semibold text-orange-600 mb-2">
            Chat with {teacher.name}
          </h3>
          <AIChat
            teachers={[
              {
                id: teacher.id,
                name: teacher.name,
                avatar: teacher.avatar,
                subject: teacher.subjects[language],
                bio: teacher.bios[language],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}