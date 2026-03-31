import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, User, Mail, Phone, MapPin, Award, Calendar, Edit, Save } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useState } from "react";

export function DoctorProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const doctorInfo = {
    name: "Dr. Sarah Chen",
    specialty: "Neurologist",
    license: "MD-78945",
    email: "sarah.chen@clinivue.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco Medical Center",
    experience: "12 years",
    education: "Harvard Medical School, MD",
    certifications: [
      "Board Certified Neurologist",
      "Advanced Neuroimaging Specialist",
      "Clinical AI Integration Expert"
    ],
    stats: [
      { label: "Patients Treated", value: "1,247" },
      { label: "Scans Analyzed", value: "3,891" },
      { label: "Success Rate", value: "97.8%" },
      { label: "Years Experience", value: "12" }
    ]
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate("/doctor")}
          variant="outline"
          className="rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        </div>
        <Button 
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`rounded-xl ${
            isEditing
              ? 'bg-[#14b8a6] hover:bg-[#0f766e]'
              : 'bg-[#14b8a6] hover:bg-[#0f766e]'
          }`}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card className="p-8 backdrop-blur-xl bg-teal-50/50 border-white/50 shadow-xl">
        <div className="flex items-start gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-32 h-32 rounded-full bg-[#14b8a6] flex items-center justify-center text-white text-4xl font-bold"
          >
            SC
          </motion.div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{doctorInfo.name}</h2>
            <p className="text-xl text-gray-700 mb-4">{doctorInfo.specialty}</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                License: {doctorInfo.license}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {doctorInfo.experience} experience
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {doctorInfo.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-teal-100">
                <Mail className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Email</div>
                <div className="font-semibold text-gray-900">{doctorInfo.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Phone</div>
                <div className="font-semibold text-gray-900">{doctorInfo.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Location</div>
                <div className="font-semibold text-gray-900">{doctorInfo.location}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Education & Certifications */}
        <Card className="p-6 backdrop-blur-xl bg-white/70 border-white/50 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Qualifications</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600 mb-2">Education</div>
              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200">
                <div className="font-semibold text-gray-900">{doctorInfo.education}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Certifications</div>
              <div className="space-y-2">
                {doctorInfo.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/50 border border-purple-200"
                  >
                    <Award className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-sm text-gray-900">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}