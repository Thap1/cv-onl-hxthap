"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, User, Briefcase, Code, FolderOpen, GraduationCap, LogOut, Check } from "lucide-react";

interface CVData {
  personal: {
    name: { vi: string; en: string };
    title: { vi: string; en: string };
    email: string;
    github: string;
    linkedin: string;
  };
  about: { vi: string; en: string };
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    companiesWorked: number;
  };
  skills: Array<{ name: string; level: number; category: string }>;
  experience: Array<{
    company: string;
    role: { vi: string; en: string };
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    description: { vi: string; en: string };
  }>;
  projects: Array<{
    name: string;
    period: string;
    description: { vi: string; en: string };
    role: { vi: string; en: string };
    teamSize: number;
    technologies: string[];
    highlights: { vi: string[]; en: string[] };
  }>;
  education: Array<{
    school: { vi: string; en: string };
    degree: { vi: string; en: string };
    period: string;
  }>;
}

const ADMIN_PASSWORD = "admin123"; // Thaph có thể đổi password này

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("personal");
  const [data, setData] = useState<CVData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load data from API
    fetch("/api/cv-data")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => {
        // Fallback to default data
        import("@/data/cv-data").then((mod) => setData(mod.cvData as CVData));
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Sai mật khẩu!");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cv-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      alert("Lỗi khi lưu!");
    }
    setSaving(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-gradient">
            🔐 Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary-600 transition-colors font-medium"
            >
              Đăng nhập
            </button>
          </form>
          <p className="text-center text-white/40 text-sm mt-4">
            Mật khẩu mặc định: admin123
          </p>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white/60">Đang tải...</div>
      </div>
    );
  }

  const tabs = [
    { id: "personal", icon: User, label: "Thông tin cá nhân" },
    { id: "skills", icon: Code, label: "Kỹ năng" },
    { id: "experience", icon: Briefcase, label: "Kinh nghiệm" },
    { id: "projects", icon: FolderOpen, label: "Dự án" },
    { id: "education", icon: GraduationCap, label: "Học vấn" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gradient">📝 CV Admin Panel</h1>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleSave}
              disabled={saving}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              {saved ? <Check size={18} /> : <Save size={18} />}
              {saving ? "Đang lưu..." : saved ? "Đã lưu!" : "Lưu thay đổi"}
            </motion.button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="glass-card p-6">
          {activeTab === "personal" && (
            <PersonalForm data={data} setData={setData} />
          )}
          {activeTab === "skills" && (
            <SkillsForm data={data} setData={setData} />
          )}
          {activeTab === "experience" && (
            <ExperienceForm data={data} setData={setData} />
          )}
          {activeTab === "projects" && (
            <ProjectsForm data={data} setData={setData} />
          )}
          {activeTab === "education" && (
            <EducationForm data={data} setData={setData} />
          )}
        </div>
      </div>
    </div>
  );
}

// Personal Info Form
function PersonalForm({ data, setData }: { data: CVData; setData: (d: CVData) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Tên (Tiếng Việt)</label>
          <input
            type="text"
            value={data.personal.name.vi}
            onChange={(e) =>
              setData({
                ...data,
                personal: { ...data.personal, name: { ...data.personal.name, vi: e.target.value } },
              })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">Name (English)</label>
          <input
            type="text"
            value={data.personal.name.en}
            onChange={(e) =>
              setData({
                ...data,
                personal: { ...data.personal, name: { ...data.personal.name, en: e.target.value } },
              })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Chức danh (Tiếng Việt)</label>
          <input
            type="text"
            value={data.personal.title.vi}
            onChange={(e) =>
              setData({
                ...data,
                personal: { ...data.personal, title: { ...data.personal.title, vi: e.target.value } },
              })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">Title (English)</label>
          <input
            type="text"
            value={data.personal.title.en}
            onChange={(e) =>
              setData({
                ...data,
                personal: { ...data.personal, title: { ...data.personal.title, en: e.target.value } },
              })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Email</label>
          <input
            type="email"
            value={data.personal.email}
            onChange={(e) =>
              setData({ ...data, personal: { ...data.personal, email: e.target.value } })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">GitHub URL</label>
          <input
            type="url"
            value={data.personal.github}
            onChange={(e) =>
              setData({ ...data, personal: { ...data.personal, github: e.target.value } })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={data.personal.linkedin}
            onChange={(e) =>
              setData({ ...data, personal: { ...data.personal, linkedin: e.target.value } })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Số năm kinh nghiệm</label>
          <input
            type="number"
            value={data.stats.yearsOfExperience}
            onChange={(e) =>
              setData({ ...data, stats: { ...data.stats, yearsOfExperience: parseInt(e.target.value) || 0 } })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">Số dự án</label>
          <input
            type="number"
            value={data.stats.projectsCompleted}
            onChange={(e) =>
              setData({ ...data, stats: { ...data.stats, projectsCompleted: parseInt(e.target.value) || 0 } })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">Số công ty</label>
          <input
            type="number"
            value={data.stats.companiesWorked}
            onChange={(e) =>
              setData({ ...data, stats: { ...data.stats, companiesWorked: parseInt(e.target.value) || 0 } })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/60 mb-2">Giới thiệu (Tiếng Việt)</label>
        <textarea
          value={data.about.vi}
          onChange={(e) => setData({ ...data, about: { ...data.about, vi: e.target.value } })}
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none resize-none"
        />
      </div>
      <div>
        <label className="block text-sm text-white/60 mb-2">About (English)</label>
        <textarea
          value={data.about.en}
          onChange={(e) => setData({ ...data, about: { ...data.about, en: e.target.value } })}
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none resize-none"
        />
      </div>
    </div>
  );
}

// Skills Form
function SkillsForm({ data, setData }: { data: CVData; setData: (d: CVData) => void }) {
  const addSkill = () => {
    setData({
      ...data,
      skills: [...data.skills, { name: "", level: 5, category: "framework" }],
    });
  };

  const removeSkill = (index: number) => {
    setData({
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    });
  };

  const updateSkill = (index: number, field: string, value: string | number) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setData({ ...data, skills: newSkills });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Kỹ năng</h2>
        <button
          onClick={addSkill}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 transition-colors text-sm"
        >
          + Thêm kỹ năng
        </button>
      </div>

      <div className="space-y-4">
        {data.skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(index, "name", e.target.value)}
              placeholder="Tên kỹ năng"
              className="flex-1 px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
            />
            <select
              value={skill.category}
              onChange={(e) => updateSkill(index, "category", e.target.value)}
              className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
            >
              <option value="framework">Framework</option>
              <option value="language">Language</option>
              <option value="ui">UI Library</option>
              <option value="tool">Tool</option>
              <option value="backend">Backend</option>
              <option value="methodology">Methodology</option>
            </select>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">Lv.</span>
              <input
                type="number"
                min="1"
                max="10"
                value={skill.level}
                onChange={(e) => updateSkill(index, "level", parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none text-center"
              />
            </div>
            <button
              onClick={() => removeSkill(index)}
              className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Experience Form
function ExperienceForm({ data, setData }: { data: CVData; setData: (d: CVData) => void }) {
  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...data.experience,
        {
          company: "",
          role: { vi: "", en: "" },
          startDate: "",
          endDate: null,
          isCurrent: false,
          description: { vi: "", en: "" },
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    setData({
      ...data,
      experience: data.experience.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Kinh nghiệm làm việc</h2>
        <button
          onClick={addExperience}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 transition-colors text-sm"
        >
          + Thêm kinh nghiệm
        </button>
      </div>

      <div className="space-y-6">
        {data.experience.map((exp, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Kinh nghiệm #{index + 1}</h3>
              <button
                onClick={() => removeExperience(index)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
              >
                ✕ Xóa
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index].company = e.target.value;
                  setData({ ...data, experience: newExp });
                }}
                placeholder="Tên công ty"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
              <div className="flex items-center gap-2">
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].startDate = e.target.value;
                    setData({ ...data, experience: newExp });
                  }}
                  className="flex-1 px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
                />
                <span>-</span>
                <input
                  type="month"
                  value={exp.endDate || ""}
                  disabled={exp.isCurrent}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].endDate = e.target.value || null;
                    setData({ ...data, experience: newExp });
                  }}
                  className="flex-1 px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none disabled:opacity-50"
                />
                <label className="flex items-center gap-2 text-sm whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={exp.isCurrent}
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[index].isCurrent = e.target.checked;
                      if (e.target.checked) newExp[index].endDate = null;
                      setData({ ...data, experience: newExp });
                    }}
                  />
                  Hiện tại
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={exp.role.vi}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index].role.vi = e.target.value;
                  setData({ ...data, experience: newExp });
                }}
                placeholder="Vị trí (Tiếng Việt)"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
              <input
                type="text"
                value={exp.role.en}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index].role.en = e.target.value;
                  setData({ ...data, experience: newExp });
                }}
                placeholder="Position (English)"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
            </div>

            <textarea
              value={exp.description.vi}
              onChange={(e) => {
                const newExp = [...data.experience];
                newExp[index].description.vi = e.target.value;
                setData({ ...data, experience: newExp });
              }}
              placeholder="Mô tả công việc (Tiếng Việt)"
              rows={2}
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Projects Form (simplified)
function ProjectsForm({ data, setData }: { data: CVData; setData: (d: CVData) => void }) {
  const addProject = () => {
    setData({
      ...data,
      projects: [
        ...data.projects,
        {
          name: "",
          period: "",
          description: { vi: "", en: "" },
          role: { vi: "", en: "" },
          teamSize: 1,
          technologies: [],
          highlights: { vi: [], en: [] },
        },
      ],
    });
  };

  const removeProject = (index: number) => {
    setData({
      ...data,
      projects: data.projects.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Dự án</h2>
        <button
          onClick={addProject}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 transition-colors text-sm"
        >
          + Thêm dự án
        </button>
      </div>

      <div className="space-y-6">
        {data.projects.map((project, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Dự án #{index + 1}</h3>
              <button
                onClick={() => removeProject(index)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
              >
                ✕ Xóa
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                value={project.name}
                onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[index].name = e.target.value;
                  setData({ ...data, projects: newProjects });
                }}
                placeholder="Tên dự án"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
              <input
                type="text"
                value={project.period}
                onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[index].period = e.target.value;
                  setData({ ...data, projects: newProjects });
                }}
                placeholder="Thời gian (vd: 04/2022 - Present)"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
              <input
                type="number"
                value={project.teamSize}
                onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[index].teamSize = parseInt(e.target.value) || 1;
                  setData({ ...data, projects: newProjects });
                }}
                placeholder="Team size"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={project.role.vi}
                onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[index].role.vi = e.target.value;
                  setData({ ...data, projects: newProjects });
                }}
                placeholder="Vai trò (Tiếng Việt)"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
              <input
                type="text"
                value={project.technologies.join(", ")}
                onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[index].technologies = e.target.value.split(",").map((t) => t.trim());
                  setData({ ...data, projects: newProjects });
                }}
                placeholder="Technologies (comma separated)"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
            </div>

            <textarea
              value={project.description.vi}
              onChange={(e) => {
                const newProjects = [...data.projects];
                newProjects[index].description.vi = e.target.value;
                setData({ ...data, projects: newProjects });
              }}
              placeholder="Mô tả dự án (Tiếng Việt)"
              rows={2}
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Education Form
function EducationForm({ data, setData }: { data: CVData; setData: (d: CVData) => void }) {
  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...data.education,
        { school: { vi: "", en: "" }, degree: { vi: "", en: "" }, period: "" },
      ],
    });
  };

  const removeEducation = (index: number) => {
    setData({
      ...data,
      education: data.education.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Học vấn</h2>
        <button
          onClick={addEducation}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 transition-colors text-sm"
        >
          + Thêm học vấn
        </button>
      </div>

      <div className="space-y-4">
        {data.education.map((edu, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Học vấn #{index + 1}</h3>
              <button
                onClick={() => removeEducation(index)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
              >
                ✕ Xóa
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={edu.school.vi}
                onChange={(e) => {
                  const newEdu = [...data.education];
                  newEdu[index].school.vi = e.target.value;
                  setData({ ...data, education: newEdu });
                }}
                placeholder="Trường (Tiếng Việt)"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
              <input
                type="text"
                value={edu.school.en}
                onChange={(e) => {
                  const newEdu = [...data.education];
                  newEdu[index].school.en = e.target.value;
                  setData({ ...data, education: newEdu });
                }}
                placeholder="School (English)"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={edu.degree.vi}
                onChange={(e) => {
                  const newEdu = [...data.education];
                  newEdu[index].degree.vi = e.target.value;
                  setData({ ...data, education: newEdu });
                }}
                placeholder="Bằng cấp (Tiếng Việt)"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
              <input
                type="text"
                value={edu.period}
                onChange={(e) => {
                  const newEdu = [...data.education];
                  newEdu[index].period = e.target.value;
                  setData({ ...data, education: newEdu });
                }}
                placeholder="Thời gian (vd: 2014 - 2018)"
                className="px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-primary outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
