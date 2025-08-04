// src/components/Profile.tsx
export default function Profile() {
  const profile = {
    first_name: "George",
    last_name: "Gyamfi",
    email: "george@ug.edu.gh",
    program: "Computer Engineering",
    year_of_study: 2,
  };

  return (
    <div className=" p-4 ">
      <h2 className="text-xl font-medium mb-4 text-grey-600">Welcome <span className="text-blue-600 font-bold">{profile.first_name}</span></h2>

      <h2 className="text-xl font-bold mb-2">Profile</h2>
      <p className="text-grey-400"><strong>Name</strong><br /> {profile.first_name} {profile.last_name}</p><br />
      <p><strong >Email</strong><br /> {profile.email}</p><br />
      <p><strong>Program</strong><br /> {profile.program}</p><br />
      <p><strong>Year of Study</strong><br /> {profile.year_of_study}</p><br />
    </div>
  );
}