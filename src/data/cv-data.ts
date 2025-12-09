export const cvData = {
  personal: {
    name: {
      vi: "Hoàng Xuân Tháp",
      en: "Hoang Xuan Thap",
    },
    title: {
      vi: "Frontend Lead Developer",
      en: "Frontend Lead Developer",
    },
    yearOfBirth: 1996,
    location: "Vietnam",
    email: "hoangthap15.it@gmail.com",
    github: "https://github.com/Thap1",
    linkedin: "https://www.linkedin.com/in/thap-hoang-garen-5949831a9/"
  },

  stats: {
    yearsOfExperience: 7,
    projectsCompleted: 7,
    companiesWorked: 2,
    maxTeamSize: 15,
  },

  about: {
    vi: "Với hơn 7 năm kinh nghiệm phát triển ứng dụng web sử dụng các công nghệ như HTML5, CSS3, JavaScript, VueJs, ReactJs, Angular 2+, Java Core, v.v., tôi tự tin cung cấp dịch vụ chuyên nghiệp với chất lượng cao và đóng góp vào sự thành công của công ty.",
    en: "With 7+ years of experience in web application development using an array of technologies like HTML5, CSS3, JavaScript, VueJs, ReactJs, Angular 2+, Java Core, etc., I am confident in providing professional services with high quality and contributing to the success of my workplace.",
  },

  skills: [
    // Level 8 - Master
    { name: "React / React Native", level: 8, category: "framework" },
    { name: "Ant Design", level: 8, category: "ui" },
    { name: "VS Code / IntelliJ", level: 8, category: "tool" },
    // Level 7 - Expert
    { name: "Vue.js", level: 7, category: "framework" },
    { name: "TypeScript", level: 7, category: "language" },
    { name: "HTML / CSS / JavaScript", level: 7, category: "language" },
    { name: "Semantic UI", level: 7, category: "ui" },
    { name: "Material Design", level: 7, category: "ui" },
    { name: "Vuetify", level: 7, category: "ui" },
    { name: "Git", level: 7, category: "tool" },
    { name: "Scrum / Agile", level: 7, category: "methodology" },
    // Level 6 - Expert
    { name: "Angular 2+", level: 6, category: "framework" },
    { name: "Node.js", level: 6, category: "runtime" },
    // Level 5 - Skilled
    { name: "Spring", level: 5, category: "backend" },
    { name: "Java", level: 5, category: "language" },
  ],

  experience: [
    {
      company: "Blitz IT Company",
      role: {
        vi: "Software Engineer",
        en: "Software Engineer",
      },
      startDate: "2022-03",
      endDate: null,
      isCurrent: true,
      description: {
        vi: "Lead Frontend Developer, quản lý và phát triển các dự án enterprise",
        en: "Lead Frontend Developer, managing and developing enterprise projects",
      },
    },
    {
      company: "CMC Global",
      role: {
        vi: "Software Engineer",
        en: "Software Engineer",
      },
      startDate: "2017-11",
      endDate: "2022-03",
      isCurrent: false,
      description: {
        vi: "Frontend Developer, phát triển các ứng dụng fintech và banking",
        en: "Frontend Developer, developing fintech and banking applications",
      },
    },
  ],

  projects: [
    {
      name: "AI BMAD Research",
      period: "10/2024 - Present",
      description: {
        vi: "Nghiên cứu và phát triển ứng dụng AI sử dụng BMAD (Brain-Machine Artificial Development) framework, tích hợp Claude AI để tự động hóa quy trình phát triển phần mềm",
        en: "Research and development of AI applications using BMAD (Brain-Machine Artificial Development) framework, integrating Claude AI to automate software development processes",
      },
      role: {
        vi: "AI Researcher & Developer",
        en: "AI Researcher & Developer",
      },
      teamSize: 1,
      technologies: ["Claude AI", "Next.js", "TypeScript", "BMAD Framework", "Prompt Engineering"],
      highlights: {
        vi: [
          "Nghiên cứu và triển khai BMAD workflow cho dự án thực tế",
          "Tích hợp Claude AI vào quy trình phát triển phần mềm",
          "Xây dựng CV portfolio website với AI assistance",
          "Tối ưu hóa prompt engineering cho code generation",
        ],
        en: [
          "Research and implement BMAD workflow for real projects",
          "Integrate Claude AI into software development process",
          "Build CV portfolio website with AI assistance",
          "Optimize prompt engineering for code generation",
        ],
      },
    },
    {
      name: "HorizonX",
      period: "04/2022 - Present",
      description: {
        vi: "Ứng dụng web phân tích cảnh báo, xử lý điều tra các trường hợp giao dịch ngân hàng",
        en: "Web-based application that analyzes alerts, scoring and handling investigations using cases from bank data",
      },
      role: {
        vi: "Developer Lead Front-End",
        en: "Developer Lead Front-End",
      },
      teamSize: 12,
      technologies: ["ReactJS", "Ant Design", "Highcharts", "Axios"],
      highlights: {
        vi: [
          "Quản lý và báo cáo tiến độ team front-end",
          "Xây dựng core project và các component dùng chung",
          "Thiết kế UI và phân quyền truy cập",
        ],
        en: [
          "Manage and report front-end team progress",
          "Build core project and common components",
          "UI design and role-based access permissions",
        ],
      },
    },
    {
      name: "Transformatrix",
      period: "11/2021 - 03/2022",
      description: {
        vi: "Phần mềm quản lý vận tải đám mây, giúp quản lý đơn hàng, điều phối đội xe và theo dõi tiến độ",
        en: "Cloud transportation management software for order management, fleet dispatch and progress monitoring",
      },
      role: {
        vi: "Developer Lead Front-End",
        en: "Developer Lead Front-End",
      },
      teamSize: 15,
      technologies: ["ReactJS", "Semantic UI", "Keycloak", "Crypto-js"],
      highlights: {
        vi: [
          "Lead team front-end 15 người",
          "Tích hợp đăng nhập với Keycloak",
          "Xử lý dữ liệu trực tiếp khi API chưa hoàn thiện",
        ],
        en: [
          "Lead front-end team of 15 members",
          "Keycloak authentication integration",
          "Direct data processing when APIs were incomplete",
        ],
      },
    },
    {
      name: "Security Bank Financial (SBF)",
      period: "04/2019 - 11/2021",
      description: {
        vi: "Nền tảng quản lý giao dịch giữa các bên liên quan dựa trên thế chấp và cho vay tiêu dùng",
        en: "Platform to manage transactions among stakeholders based on mortgage and consumer loans",
      },
      role: {
        vi: "Front-End Developer",
        en: "Front-End Developer",
      },
      teamSize: 10,
      technologies: ["ReactJS", "MongoDB", "Charts"],
      highlights: {
        vi: [
          "Xây dựng UI và core project",
          "Phân quyền truy cập theo vai trò",
          "Xử lý search, sort, export Excel, state management",
        ],
        en: [
          "Build UI and core project",
          "Role-based access permissions",
          "Search, sort, Excel export, state management",
        ],
      },
    },
    {
      name: "Supply Chain Financial (Yoma Bank)",
      period: "09/2019 - 04/2021",
      description: {
        vi: "Nền tảng quản lý giao dịch dựa trên cơ chế thế chấp và thanh toán trả chậm",
        en: "Platform to manage transactions based on mortgage and deferred payment mechanisms",
      },
      role: {
        vi: "Front-End Developer",
        en: "Front-End Developer",
      },
      teamSize: 6,
      technologies: ["ReactJS", "MySQL", "Axios"],
      highlights: {
        vi: ["Bảo trì và phát triển UI", "Phân quyền và quản lý state"],
        en: [
          "UI maintenance and development",
          "Permissions and state management",
        ],
      },
    },
    {
      name: "Supply Chain Financial (SCF)",
      period: "04/2019 - 09/2019",
      description: {
        vi: "Nền tảng quản lý giao dịch chuỗi cung ứng tài chính",
        en: "Supply chain financial transaction management platform",
      },
      role: {
        vi: "Front-End Developer",
        en: "Front-End Developer",
      },
      teamSize: 5,
      technologies: ["VueJS", "MongoDB", "Charts"],
      highlights: {
        vi: ["Xây dựng UI từ đầu", "Tích hợp biểu đồ và báo cáo"],
        en: ["Build UI from scratch", "Charts and reporting integration"],
      },
    },
    {
      name: "Smart Interview",
      period: "11/2018 - 04/2019",
      description: {
        vi: "Website phỏng vấn trực tuyến kết nối với portal - Khách hàng Singapore",
        en: "Online interview website connected to portal - Singapore customer",
      },
      role: {
        vi: "Front-End Developer",
        en: "Front-End Developer",
      },
      teamSize: 7,
      technologies: ["ReactJS", "MongoDB", "Axios"],
      highlights: {
        vi: ["Phát triển UI theo design", "Kết nối API và xử lý dữ liệu"],
        en: [
          "UI development based on designs",
          "API connection and data processing",
        ],
      },
    },
  ],

  education: [
    {
      school: {
        vi: "Đại học Công nghiệp Hà Nội",
        en: "Hanoi University of Industry",
      },
      degree: {
        vi: "Cử nhân Công nghệ Phần mềm",
        en: "Bachelor Degree in Software Technology",
      },
      period: "2014 - 2018",
    },
    {
      school: {
        vi: "IT Plus",
        en: "IT Plus",
      },
      degree: {
        vi: "Java Web Full Stack",
        en: "Java Web Full Stack",
      },
      period: "02/2017 - 08/2018",
    },
    {
      school: {
        vi: "EcoIT Company",
        en: "EcoIT Company",
      },
      degree: {
        vi: "Thực tập - Java Frameworks (ZK, Liferay, Spring, Hibernate)",
        en: "Internship - Java Frameworks (ZK, Liferay, Spring, Hibernate)",
      },
      period: "12/2018 - 05/2019",
    },
  ],

  languages: [
    {
      name: {
        vi: "Tiếng Anh",
        en: "English",
      },
      level: {
        vi: "Trung bình - Đọc, Viết",
        en: "Medium - Reading, Writing",
      },
    },
  ],
};
