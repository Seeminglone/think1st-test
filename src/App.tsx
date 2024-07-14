import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import ErrorIcon from "@mui/icons-material/Error";
import CustomRangeSlider from "./Components/AgeSlider";
import FileUploadComponent from "./Components/UploadFile";
import HolidayAwareDateCalendar from "./Components/Calendar";
import { validateEmail, validateForm } from "./utils/helpers/validation";

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [age, setAge] = useState<number>(8);
  const [fileUploaded, setFileUploaded] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState<string>("");

  useEffect(() => {
    const isValid = validateForm(
      formData,
      fileUploaded,
      selectedDate,
      selectedTime
    );
    setIsFormValid(isValid);
  }, [formData, fileUploaded, selectedDate, selectedTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (fileName: string) => {
    setFileUploaded(fileName);
  };

  const handleDateTimeChange = (date: dayjs.Dayjs | null, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError(
        "Please use correct formatting.\nExample: address@email.com"
      );
      return;
    } else {
      setEmailError("");
    }

    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("age", age.toString());
    form.append("file", fileUploaded);
    form.append("dateTime", selectedDate?.format("YYYY-MM-DD") || "");
    form.append("time", selectedTime);

    try {
      const response = await axios.post("http://letsworkout.pl/submit", form);
      console.log("Form submitted successfully!", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ padding: "90px 23px" }}
    >
      <form
        className="max-w-[426px] w-full p-[0px] p-6 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-medium mb-4">Personal info</h2>
        <div className="mb-4">
          <label
            htmlFor="first-name"
            className="block text-sm font-normal leading-6 text-gray-900"
            style={{ fontSize: "1rem" }}
          >
            First Name
          </label>
          <div className="">
            <input
              id="first-name"
              name="firstName"
              type="text"
              className="block w-full font-medium h-[48px] rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              style={{ fontSize: "1rem" }}
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="last-name"
            className="block text-sm font-normal leading-6 text-gray-900"
            style={{ fontSize: "1rem" }}
          >
            Last Name
          </label>
          <div className="">
            <input
              id="last-name"
              name="lastName"
              type="text"
              className="block w-full font-medium h-[48px] rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              style={{ fontSize: "1rem" }}
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-normal leading-6 text-gray-900"
            style={{ fontSize: "1rem" }}
          >
            Email Address
          </label>
          <div className="">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={`block w-full font-medium h-[48px] rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                emailError
                  ? "ring-red-500 focus:ring-red-500 bg-red-100"
                  : "ring-gray-300 focus:ring-indigo-600"
              }`}
              style={{ fontSize: "1rem" }}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {emailError && (
            <p
              className="mt-2 text-black-600 flex items-top"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              <ErrorIcon
                className="mr-1"
                sx={{
                  color: "red",
                  width: "19px",
                  height: "19px",
                  marginTop: "2px",
                }}
              />{" "}
              {emailError.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
        <label
          htmlFor="age"
          className="block text-sm font-normal leading-6 text-gray-900"
          style={{ fontSize: "1rem" }}
        >
          Age
        </label>
        <CustomRangeSlider value={age} onValueChange={setAge} />
        <label
          htmlFor="photo"
          className="block mt-10 text-sm font-normal leading-6 text-gray-900"
          style={{ fontSize: "1rem" }}
        >
          Photo
        </label>
        <FileUploadComponent onFileChange={handleFileChange} />
        <h2 className="text-2xl mt-8 font-medium mb-4">Your workout</h2>
        <HolidayAwareDateCalendar onDateTimeChange={handleDateTimeChange} />
        <button
          type="submit"
          className={`w-full mt-10 py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ${
            isFormValid ? "bg-[#761BE4] hover:bg-[#6A19CD]" : "bg-[#CBB6E5]"
          }`}
          style={{ borderRadius: "4px" }}
          disabled={!isFormValid}
        >
          Send Application
        </button>
      </form>
    </div>
  );
};

export default App;
