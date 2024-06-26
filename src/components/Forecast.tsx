import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getForecast } from "../redux/slices/forecastSlice";
import { Forecasts, ForecastProps } from "../types/types";
import ForecastIcons from "../constants/icons";

const {
  clearDaySun,
  clearNightMoon,
  fewCloudyDay,
  fewCloudyNight,
  cloudyDay,
  cloudyNight,
  rainDay,
  rainNight,
  snowNight,
  snowDay,
  stormDay,
  stormNight,
  mistDay,
  mistNight,
  cloudy,
} = ForecastIcons;

export default function Forecast({ lat, lon }: ForecastProps) {
  const dispatch = useAppDispatch();
  const forecastRes = useAppSelector((state) => state.forecast);

  useEffect(() => {
    const fetch5DayForcast = async () => {
      if (!lat || !lon) return;
      await dispatch(getForecast({ lat, lon }));
    };

    fetch5DayForcast();
  }, [lon, lat]);

  const getNextDays = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const nextDays = [];

    for (let i = 1; i <= 5; i++) {
      const nextDayIndex = (currentDate.getDay() + i) % 7;
      const dayName = i === 1 ? "Tomorrow" : daysOfWeek[nextDayIndex];
      nextDays.push(dayName);
    }

    return nextDays;
  };

  const nextDays = getNextDays();
  const nextDayOne = nextDays[0];
  const nextDayTwo = nextDays[1];
  const nextDayThree = nextDays[2];
  const nextDayFour = nextDays[3];
  const nextDayFifth = nextDays[4];

  const weatherIconCondition = (dayIcon: string) => {
    switch (dayIcon) {
      case "01d":
        return clearDaySun;
      case "01n":
        return clearNightMoon;
      case "02d":
        return fewCloudyDay;
      case "02n":
        return fewCloudyNight;
      case "03d":
        return cloudyDay;
      case "03n":
        return cloudyNight;
      case "04d":
        return fewCloudyDay;
      case "04n":
        return fewCloudyNight;
      case "09d":
        return rainDay;
      case "09n":
        return rainNight;
      case "10d":
        return rainDay;
      case "10n":
        return rainNight;
      case "11d":
        return stormDay;
      case "11n":
        return stormNight;
      case "13d":
        return snowDay;
      case "13n":
        return snowNight;
      case "50d":
        return mistDay;
      case "50n":
        return mistNight;
      default:
        return cloudy;
    }
  };

  const kelvinToCelsius = (tempInKelvin: number) => tempInKelvin - 273.15;

  const uniqueFiveForecastDays: number[] = [];
  const list = forecastRes?.data?.list;

  const sixDayForecast = (list ?? []).filter((forecast: Forecasts) => {
    const forecastDate = new Date(forecast.dt_txt).getDate();
    if (!uniqueFiveForecastDays.includes(forecastDate)) {
      uniqueFiveForecastDays.push(forecastDate);
      return true;
    }
    return false;
  });

  const fiveDaysForcast = sixDayForecast.slice(1);

  const firstDay = fiveDaysForcast[0];
  const secondDay = fiveDaysForcast[1];
  const thirdDay = fiveDaysForcast[2];
  const forthDay = fiveDaysForcast[3];
  const fifthDay = fiveDaysForcast[4];

  const firstDayIcon = firstDay?.weather?.[0]?.icon ?? "01d";
  const firstDayMaxTemp = kelvinToCelsius(firstDay?.main?.temp_max);
  const firstDayMinTemp = kelvinToCelsius(firstDay?.main?.temp_min);
  const firstDayDescription = firstDay?.weather?.[0]?.description;

  const secondDayIcon = secondDay?.weather?.[0]?.icon ?? "01d";
  const secondDayMaxTemp = kelvinToCelsius(secondDay?.main?.temp_max);
  const secondDayMinTemp = kelvinToCelsius(secondDay?.main?.temp_min);
  const secondDayDescription = secondDay?.weather?.[0]?.description;

  const thirdDayIcon = thirdDay?.weather?.[0]?.icon ?? "01d";
  const thirdDayMaxTemp = kelvinToCelsius(thirdDay?.main?.temp_max);
  const thirdDayMinTemp = kelvinToCelsius(thirdDay?.main?.temp_min);
  const thirdDayDescription = thirdDay?.weather?.[0]?.description;

  const forthDayIcon = forthDay?.weather?.[0]?.icon ?? "01d";
  const forthDayMaxTemp = kelvinToCelsius(forthDay?.main?.temp_max);
  const forthDayMinTemp = kelvinToCelsius(forthDay?.main?.temp_min);
  const forthDayDescription = forthDay?.weather?.[0]?.description;

  const fifthDayIcon = fifthDay?.weather?.[0]?.icon ?? "01d";
  const fifthDayMaxTemp = kelvinToCelsius(fifthDay?.main?.temp_max);
  const fifthDayMinTemp = kelvinToCelsius(fifthDay?.main?.temp_min);
  const fifthDayDescription = fifthDay?.weather?.[0]?.description;

  return (
    <>
      <div className="bottom-right md:h-[33%] border border-transparent md:mt-[1%] rounded-[12px] md:ml-5 p-0 md:p-4 bg-[#16161f]  flex flex-col justify-center	">
        <div className="h-[20%] border border-transparent flex">
          <p className="text-[#7F7F98] text-[16px] pt-[px] my-auto font-normal leading-[22.4px]">
            Previsão para 5 dias
          </p>
        </div>
        <div className="forcasts w-[100%] border border-transparent pt-[px] flex">
          <div className="day w-[20%] border border-transparent flex flex-col  items-center">
            <p className="font-bold	text-[#BFBFD4] text-[11px] sm:text-sm text-center ">
              {nextDayOne}
            </p>
            <div className="icon w-[70px] h-[67px] cursor-pointer">
              <img src={weatherIconCondition(firstDayIcon)} alt="first day" />
            </div>
            <div className="desc  text-white text-center lg:text-[14px] hidden md:block sm:text-[16px]">
              {firstDayDescription}
            </div>

            <div className="temp flex flex-col p-2 lg:flex-row md:flex-row ">
              <div className="max">
                <p className="text-neutral-50 text-[14px] sm:text-sm font-bold leading-tight ">
                  {`${Math.floor(firstDayMaxTemp)}ºC`}
                </p>
              </div>
              <div className="min lg:ml-3 md:ml-2">
                <p className=" text-slate-500  text-[14px] sm:text-sm  font-bold leading-tight">
                  {`${Math.floor(firstDayMinTemp)}ºC`}
                </p>
              </div>
            </div>
          </div>
          <div className="day w-[20%] border border-transparent flex flex-col  items-center">
            <p className="font-bold	text-[#BFBFD4]  text-[11px] sm:text-sm  text-center ">
              {nextDayTwo}
            </p>
            <div className="icon w-[70px] h-[67px] cursor-pointer">
              <img src={weatherIconCondition(secondDayIcon)} alt="second day" />
            </div>
            <div className="desc text-white text-center lg:text-[14px] hidden md:block sm:text-[16px]">
              {secondDayDescription}
            </div>

            <div className="temp flex flex-col p-2 lg:flex-row md:flex-row">
              <div className="max">
                <p className="text-neutral-50  text-[14px] sm:text-sm  font-bold leading-tight ">
                  {`${Math.floor(secondDayMaxTemp)}ºC`}
                </p>
              </div>
              <div className="min lg:ml-3 md:ml-2">
                <p className=" text-slate-500  text-[14px] sm:text-sm  font-bold leading-tight">
                  {`${Math.floor(secondDayMinTemp)}ºC`}
                </p>
              </div>
            </div>
          </div>
          <div className="day w-[20%] border border-transparent flex flex-col  items-center">
            <p className="font-bold	text-[#BFBFD4] text-[11px] sm:text-sm text-center ">
              {nextDayThree}
            </p>
            <div className="icon w-[70px] h-[67px] cursor-pointer">
              <img src={weatherIconCondition(thirdDayIcon)} alt="third day" />
            </div>

            <div className="desc text-white text-center lg:text-[14px] hidden md:block sm:text-[16px]">
              {thirdDayDescription}
            </div>

            <div className="temp flex flex-col p-2 lg:flex-row md:flex-row">
              <div className="max">
                <p className="text-neutral-50  text-[14px] sm:text-sm  font-bold leading-tight ">
                  {`${Math.floor(thirdDayMaxTemp)}ºC`}
                </p>
              </div>
              <div className="min lg:ml-3 md:ml-2">
                <p className=" text-slate-500  text-[14px] sm:text-sm  font-bold leading-tight">
                  {`${Math.floor(thirdDayMinTemp)}ºC`}
                </p>
              </div>
            </div>
          </div>
          <div className="day w-[20%] border border-transparent flex flex-col  items-center">
            <p className="font-bold	text-[#BFBFD4] text-[11px]  sm:text-sm text-center ">
              {nextDayFour}
            </p>
            <div className="icon w-[70px] h-[67px] cursor-pointer">
              <img src={weatherIconCondition(forthDayIcon)} alt="forth day" />
            </div>
            <div className="desc text-white text-center lg:text-[14px] hidden md:block sm:text-[16px]">
              {forthDayDescription}
            </div>

            <div className="temp flex flex-col p-2 lg:flex-row md:flex-row">
              <div className="max">
                <p className="text-neutral-50  text-[14px] sm:text-sm  font-bold leading-tight ">
                  {`${Math.floor(forthDayMaxTemp)}ºC`}
                </p>
              </div>
              <div className="min lg:ml-3 md:ml-2">
                <p className=" text-slate-500  text-[14px] sm:text-sm  font-bold leading-tight">
                  {`${Math.floor(forthDayMinTemp)}ºC`}
                </p>
              </div>
            </div>
          </div>
          <div className="day w-[20%] border border-transparent flex flex-col  items-center">
            <p className="font-bold	text-[#BFBFD4] text-[11px] sm:text-sm text-center ">
              {nextDayFifth}
            </p>
            <div className="icon w-[70px] h-[67px] cursor-pointer">
              <img src={weatherIconCondition(fifthDayIcon)} alt="fifth day" />
            </div>

            <div className="desc text-white text-center lg:text-[14px] hidden md:block sm:text-[16px]">
              {fifthDayDescription}
            </div>

            <div className="temp flex flex-col p-2 lg:flex-row md:flex-row">
              <div className="max">
                <p className="text-neutral-50  text-[14px] sm:text-sm  font-bold leading-tight ">
                  {`${Math.floor(fifthDayMaxTemp)}ºC`}
                </p>
              </div>
              <div className="min lg:ml-3 md:ml-2">
                <p className=" text-slate-500  text-[14px] sm:text-sm  font-bold leading-tight">
                  {`${Math.floor(fifthDayMinTemp)}ºC`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
