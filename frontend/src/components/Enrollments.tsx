// src/components/Enrollments.tsx
export default function Enrollments() {
  const courses = [
    { course_code: "CPEN201", course_name: "Data Structures", credits: 3 },
    { course_code: "MATH251", course_name: "Differential Equations", credits: 4 },
    { course_code: "CPEN301", course_name: "Linear Circuits", credits: 3 },
    { course_code: "CPEN401", course_name: "Academic Writing", credits: 4 },
  ];

  return (
    <div className="bg-brown-100 shadow-md  p-4 rounded-xl border-blue-100 border-4 ">
      <h2 className="text-xl font-bold mb-2 text-grey-400">Enrolled Courses</h2>
      <ul className="list-none pl-5 space-y-4 divide-y divide-grey-300">
        {courses.map((course, index) => (
          <li className="border-b-black" key={index}>
            {course.course_code} - {course.course_name} ({course.credits} credits)
          </li>
        ))}
      </ul>
    </div>
  );
}
