

import {google } from 'googleapis'
import nodemailer from 'nodemailer'
import fs from 'fs'

// const { google } = require("googleapis");
// const fs = require("fs");
// const nodemailer = require("nodemailer");

const SERVICE_ACCOUNT_EMAIL =
  "duyserviceaccountcalendar@gg-calendar-ruby.iam.gserviceaccount.com";
const SERVICE_ACCOUNT_FILE = "src/config/gg-calendar-ruby-service-account.json";
const CALENDAR_ID = "duy@coderpush.com";

// Set up email delivery method
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "txd22081999@gmail.com", // Replace with your Gmail address
    pass: "kxtu mipe owot gmxb", // Replace with your Gmail password
  },
});

// Send the email
function sendEmail(subject: string, body: string) {
  const mailOptions = {
    from: "txd22081999@gmail.com",
    to: "duy@coderpush.com",
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

async function initializeCalendarService() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date(2023, 0, 1).toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    if (events.length === 0) {
      console.log("No events found.");
    } else {
      console.log(`Events for calendar ${CALENDAR_ID} from 2023 onwards:`);
      events.forEach((event) => {
        const startDate = new Date(event.start?.dateTime || event.start?.date || '');
        if (startDate >= new Date(2023, 0, 1)) {
          console.log(`- ${event.summary} at ${startDate}`);
        }
      });
    }
    return events;
  } catch (error) {
    console.error("Error fetching events:", (error as any).message);
    return [];
  }
}

async function authorizeAndLoadClient() {
  try {
    const calendar = await initializeCalendarService();
    return calendar;
  } catch (error) {
    console.error("Authorization failed:", (error as any).message);
  }
}

// function formatEmailBody(paragraph) {
//   const lines = paragraph.split("\n");
//   const formattedBody = lines.join("\n\n");
//   return formattedBody;
// }

// async function handleEvents(service) {
//   const calendarId = "primary";
//   const startTime = new Date().toISOString().split("T")[0] + "T00:00:00Z"; // Start of the current day
//   const endTime =
//     new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
//       .toISOString()
//       .split("T")[0] + "T23:59:59Z"; // End of the current month

//   try {
//     const response = await service.events.list({
//       calendarId: calendarId,
//       timeMin: startTime,
//       timeMax: endTime,
//       maxResults: 1000,
//       singleEvents: true,
//       orderBy: "startTime",
//       fields: "items(summary,attendees)", // Request only summary and attendees fields
//     });

//     const events = response.data.items;
//     const eventSummary = {};

//     if (events.length === 0) {
//       console.log("No upcoming events found");
//       return;
//     }

//     console.log("Events in the current month:");

//     events.forEach((event) => {
//       const summary = event.summary;
//       const attendees = event.attendees || [];

//       if (!eventSummary[summary]) {
//         eventSummary[summary] = { count: 0, attendees: [] };
//       }

//       eventSummary[summary].count += 1;
//       eventSummary[summary].attendees.push(
//         ...attendees.map((attendee) => attendee.email)
//       );
//     });

//     console.log(
//       "Summary of events in",
//       new Date().toLocaleString("en-US", { month: "long" }) + ":"
//     );
//     formatEventsSummary(eventSummary);
//   } catch (error) {
//     console.error("Error fetching events:", error.message);
//   }
// }

// function formatEventsSummary(eventSummary) {
//   Object.keys(eventSummary).forEach((summary) => {
//     const event = eventSummary[summary];
//     console.log(`- ${summary} (Count: ${event.count})`);
//     console.log("Attendees:", event.attendees.join(", "));
//   });
// }

function convertToTableSummary(filteredEventsSummaryParam : any) {
  const coderpusherEmails = [
    "minhhung@coderpush.com",
    "min@coderpush.com",
    "caochau@coderpush.com",
    "nhatanh@coderpush.com",
    "quang@coderpush.com",
    "kelly@coderpush.com",
    "nhat@coderpush.com",
    "vinh.duong@coderpush.com",
    "nghia.huynh@coderpush.com",
    "thien.huynh@coderpush.com",
    "bsu@coderpush.com",
    "truong@coderpush.com",
    "huy.le@coderpush.com",
    "thanh.le@coderpush.com",
    "dao.mai@coderpush.com",
    "thinh@coderpush.com",
    "vi@coderpush.com",
    "phi@coderpush.com",
    "quy.nguyen@coderpush.com",
    "hoangminh@coderpush.com",
    "nam@coderpush.com",
    "james@coderpush.com",
    "tri.nguyen@coderpush.com",
    "diem@coderpush.com",
    "ngan@coderpush.com",
    "uyen@coderpush.com",
    "dat.nguyen@coderpush.com",
    "nhi@coderpush.com",
    "ha.pham@coderpush.com",
    "hieu.pham@coderpush.com",
    "sieu@coderpush.com",
    "vinh.tran@coderpush.com",
    "duy@coderpush.com",
    "phong@coderpush.com",
    "thuhien@coderpush.com",
    "kimlong@coderpush.com",
    "thong.dang@coderpush.com",
    "vanhung@coderpush.com",
    "viet@coderpush.com",
    "long.truong@coderpush.com",
    "oai@coderpush.com",
    "tron@coderpush.com",
    "hung.dang@coderpush.com",
    "thientran@coderpush.com",
    "khanh@coderpush.com",
    "john@coderpush.com",
    "du@coderpush.com",
    "hien@coderpush.com",
    "loan@coderpush.com",
    "dieuhuyen@coderpush.com",
    "thanh@coderpush.com",
    "son@coderpush.com",
    "ha.nguyen@coderpush.com",
    "hanna@coderpush.com",
    "hugh@coderpush.com",
    "trang@coderpush.com",
    "chau@coderpush.com",
    "cong@coderpush.com",
    "huyen@coderpush.com",
    "ruby@coderpush.com",
    "si@coderpush.com",
  ];

  const managerEmail = ["thien.kieu@coderpush.com", "leo@coderpush.com"];

  const eventsWithManagersParticipants = [];

  const filteredEventsSummary = filteredEventsSummaryParam;

  for (const [eventName, eventDataArray] of Object.entries(
    filteredEventsSummary
  )) {
    const event_data = (eventDataArray as any)[0];
    const managers = event_data.attendees.filter((email: string) =>
      managerEmail.includes(email)
    );
    const participants = event_data.attendees.filter(
      (email: string) => !managerEmail.includes(email)
    );

    const eventObject = {
      manager: managers.join(", "),
      participants: participants,
    };
    eventsWithManagersParticipants.push(eventObject);
  }

  const participantsGroupedByManager : any = {};

  eventsWithManagersParticipants.forEach((event) => {
    const { manager, participants } = event;
    if (!participantsGroupedByManager.manager) {
      participantsGroupedByManager.manager = [];
    }
    participantsGroupedByManager.manager =
      participantsGroupedByManager.manager.concat(participants);
  });

  const managerEmployeeObjects = [];

  for (const [manager, participants] of Object.entries(
    participantsGroupedByManager
  )) {
    const managerEmployeeObject = { manager: manager, scheduled: participants };
    managerEmployeeObjects.push(managerEmployeeObject);
  }

  const managerScheduledObjectsWithUnscheduled = [];

  for (const [manager, participants] of Object.entries(
    participantsGroupedByManager
  )) {
    const unscheduledEmails = coderpusherEmails.filter(
      (email) => !(participants as unknown as any).includes(email) && email !== manager
    );
    const managerScheduledObject = {
      manager: manager,
      scheduled: participants,
      unscheduled: unscheduledEmails,
    };
    managerScheduledObjectsWithUnscheduled.push(managerScheduledObject);
  }

  return convertToTable(managerScheduledObjectsWithUnscheduled, 120);
}

function convertToTable(array: any[], maxWidth: number) {
  const padString = (str: string, length: number) => str.padEnd(length);

  const maxColumnLengths = array.reduce(
    (maxLengths, item) => {
      maxLengths.manager = Math.max(maxLengths.manager, item.manager.length);
      maxLengths.scheduled = Math.max(
        maxLengths.scheduled,
        item.scheduled.join(", ").length
      );
      maxLengths.unscheduled = Math.max(
        maxLengths.unscheduled,
        item.unscheduled.join(", ").length
      );
      return maxLengths;
    },
    { manager: 0, scheduled: 0, unscheduled: 0 }
  );

  const totalWidth =
    Object.values(maxColumnLengths as unknown as any).reduce((acc: any, curr: any) => acc + curr, 0) as number + 10;
  const widthRatio = maxWidth / totalWidth;

  const columnWidths = Object.fromEntries(
    Object.entries(maxColumnLengths).map(([key, value]) => [
      key,
      Math.floor((value as unknown as any) * widthRatio),
    ])
  );

  const header = `| ${padString("Manager", columnWidths.manager)} | ${padString(
    "Scheduled",
    columnWidths.scheduled
  )} | ${padString("Unscheduled", columnWidths.unscheduled)} |`;
  const separator = `+-${"-".repeat(columnWidths.manager)}-+-${"-".repeat(
    columnWidths.scheduled
  )}-+-${"-".repeat(columnWidths.unscheduled)}-+`;

  const rows = array.map(
    (item) =>
      `| ${padString(item.manager, columnWidths.manager)} | ${padString(
        item.scheduled.join(", "),
        columnWidths.scheduled
      )} | ${padString(
        item.unscheduled.join(", "),
        columnWidths.unscheduled
      )} |`
  );

  const tableString = [separator, header, separator, ...rows, separator].join(
    "\n"
  );

  return tableString;
}

function formatEventsSummary(eventsSummary: any) {
  const filteredEventsSummary = Object.fromEntries(
    Object.entries(eventsSummary).filter(
      ([event_name, info]) => event_name && event_name.includes("1-1")
    )
  );
  return convertToTableSummary(filteredEventsSummary);
}

async function handleEvents() {
  try {
    const events = await initializeCalendarService();
    const eventsSummary = {} as any; 

    events.forEach((event) => {
      const summary = event.summary;
      const attendees = event.attendees || [];

      if (!eventsSummary.summary) {
        eventsSummary.summary = [];
      }

      eventsSummary.summary.push({
        count: 1,
        attendees: attendees.map((attendee) => attendee.email),
      });
    });

    const outputStr = formatEventsSummary(eventsSummary);
    const subject = "Meeting Summary"
    sendEmail(subject, outputStr);
    console.log(outputStr);
  } catch (error) {
    console.error("Error fetching events:", (error as any).message);
  }
}

module.exports = handleEvents;
