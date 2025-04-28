import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { date } from "zod";
import { addHours, addMinutes, format } from "date-fns";

const createSchedule = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;
  console.log(startDate, endDate, startTime, endTime);
  const currentDate = new Date(startDate); //start date
  const lastDate = new Date(endDate); //end date
  console.log(currentDate);
  const interval = 30;
  const schedule = [];
  while (currentDate <= lastDate) {
    console.log(date, "date");
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );
    const endDateTimed = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    while (startDateTime <= endDateTimed) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, interval),
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });

        schedule.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + interval);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
};

export const ScheduleServices = {
  createSchedule,
};
