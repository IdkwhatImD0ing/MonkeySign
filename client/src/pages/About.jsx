const About = () => {
  const team = [
    {
      name: "Simon Quach",
      school: "UCSD",
      major: "Math-CS",
      role: "Frontend",
      img: "./simon.jpg",
    },
    {
      name: "Audrey Chen",
      school: "MSU",
      major: "CE",
      role: "ML/Full Stack",
      img: "./audrey.jpg",
    },
    {
      name: "Bill Zhang",
      school: "USC",
      major: "CS",
      role: "Machine Learning",
      img: "./bill.jpg",
    },
    {
      name: "Varun Swaminathan",
      school: "NUS",
      major: "CE",
      role: "Machine Learning",
      img: "./varun.jpg",
    },
  ];
  return (
    <div className="font-lexend-deca h-[calc(100vh-80px) pt-[64px]">
      <div className="flex flex-col mx-[5%] sm:mx-[10%] cursor-default">
        <div className="font-normal text-[#cd75cf]">monkeysign squad</div>
        <div className="text-[24px]">meet the talented team</div>
        <div className="font-light text-[#9e9e9e] max-w-[700px]">
          Our team is made up of experienced developers and designers who are
          passionate about creating innovative solutions for learning American
          Sign Language.
        </div>
        <div className="flex justify-center sm:justify-start flex-wrap text-center mt-[24px] gap-[48px]">
          {team.map((member, index) => (
            <div
              key={index}
              className="max-w-[200px] flex flex-col items-center"
            >
              <img
                src={member.img}
                alt={member.img}
                className="max-w-[150px] h-auto rounded-full"
              />
              <div className="mt-[12px] flex flex-col justify-center items-center">
                <div className="text-[18px] text-[#cd75cf]">{member.name}</div>
                <div className="text-[12px] text-[#757575]">
                  {member.major} @ {member.school}
                </div>
                <div className="text-[12px] text-[#757575]">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-light text-[#9e9e9e] mt-[24px] mb-[24px] max-w-[700px]">
          From designing the user interface to developing the back-end
          functionality, each member of our team played a crucial role in
          bringing MonkeySign to life. Our team members bring a diverse set of
          skills and experiences to the table, making us a dynamic and
          collaborative group.
        </div>
      </div>
    </div>
  );
};

export default About;
