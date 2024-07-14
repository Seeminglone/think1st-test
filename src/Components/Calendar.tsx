import React, { useEffect, useState } from "react";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { shouldDisableDate } from "../utils/helpers/calendar";
import config from "../config";

interface Holiday {
  name: string;
  date: string;
  type: string;
}

interface HolidayAwareDateCalendarProps {
  onDateTimeChange: (date: dayjs.Dayjs | null, time: string) => void;
}

const HolidayAwareDateCalendar: React.FC<HolidayAwareDateCalendarProps> = ({
  onDateTimeChange,
}) => {
  const { API_URL, API_KEY } = config;

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get<Holiday[]>(API_URL, {
          params: {
            country: "CA",
            year: 2024,
            type: "public_holiday",
          },
          headers: {
            "X-Api-Key": API_KEY,
          },
        });

        setHolidays(response.data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, [API_URL, API_KEY]);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    onDateTimeChange(selectedDate, time);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const dateSelected = selectedDate !== null;

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 456);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 456);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          htmlFor="date"
          className="block mt-2 text-sm font-normal leading-6 text-gray-900"
          style={{ fontSize: "1rem" }}
        >
          Date
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            referenceDate={dayjs("2024-05-17")}
            views={["day"]}
            className="holiday-aware-calendar"
            shouldDisableDate={(date) => shouldDisableDate(date, holidays)}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </div>
      {dateSelected && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor="time"
            className="block mt-2 text-sm font-normal leading-6 text-gray-900"
            style={{ fontSize: "1rem" }}
          >
            Time
          </label>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {["12:00", "14:00", "16:30", "18:30", "20:00"].map(
              (time, index) => (
                <button
                  key={index}
                  type="button"
                  className="text-gray-900 bg-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  style={{
                    border:
                      selectedTime === time
                        ? "2px solid #761BE4"
                        : "2px solid rgb(203 182 229 / 46%)",
                  }}
                  onClick={() => handleSelectTime(time)}
                >
                  {time}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayAwareDateCalendar;
