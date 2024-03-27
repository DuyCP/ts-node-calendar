import { google } from "googleapis";
import { MattermostService } from "./mattermost";

const SERVICE_ACCOUNT_FILE = "src/config/gg-calendar-ruby-service-account.json";

const ACCESS_TOKEN = `fwjost36i3fo8pdfyjyjws51bw`;
const service = new MattermostService(ACCESS_TOKEN);
console.log("Init MM Service");

const sendMessage = async (channelId: string, message: string) => {
  const client = await service.getClient();
  console.log("🚀 ~ runService ~ client:", client);
  await service.createPost(channelId, message);
  console.log("SENT MESSAGE");
};

async function initializeCalendarService(receiverEmail: string) {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  const calendarId = receiverEmail;
  const response = await calendar.events.list({
    calendarId: calendarId,
    timeMin: new Date(2023, 0, 1).toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = response.data.items || [];
  if (events.length === 0) {
    console.log("No events found.");
  } else {
    console.log(`Events for calendar ${calendarId} from 2023 onwards:`);
    events.forEach((event) => {
      const startDate = new Date(
        event.start?.dateTime || event.start?.date || ""
      );
    });
  }
  return events;
}

function convertToTableSummary(filteredEventsSummaryParam: any) {
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

  for (const event of filteredEventsSummary) {
    // const event_data = (eventDataArray as any)[0];
    const managers = event.attendees.filter((email: string) =>
      managerEmail.includes(email)
    );
    const participants = event.attendees.filter(
      (email: string) => !managerEmail.includes(email)
    );

    const eventObject = {
      manager: managers.join(", "),
      participants: participants,
    };
    eventsWithManagersParticipants.push(eventObject);
  }

  const uniqueCombinations = new Map<string, boolean>();

  // Filter out objects with duplicate combinations
  const uniqueEventsWithManagersParticipants =
    eventsWithManagersParticipants.filter((obj) => {
      const key = `${obj.manager}-${obj.participants.join(",")}`;

      if (!uniqueCombinations.has(key)) {
        uniqueCombinations.set(key, true);
        return true;
      }
      return false;
    });

  const managerScheduledObjectsWithUnscheduled: any[] = [];

  uniqueEventsWithManagersParticipants.forEach((group) => {
    const unscheduledEmails = coderpusherEmails.filter(
      (email) =>
        !(group.participants as unknown as any).includes(email) &&
        email !== group.manager
    );
    const managerScheduledObject = {
      manager: group.manager,
      scheduled: group.participants,
      unscheduled: unscheduledEmails,
    };
    managerScheduledObjectsWithUnscheduled.push(managerScheduledObject);
  });

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
    (Object.values(maxColumnLengths as unknown as any).reduce(
      (acc: any, curr: any) => acc + curr,
      0
    ) as number) + 10;
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

function formatEventsSummary(events: any) {
  const filteredEventsSummary = events.filter(
    ({ summary, attendees }: { summary: string; attendees: string[] }) =>
      summary && summary.includes("1-1")
  );

  const uniqueSummaries = new Map<string, boolean>();

  // Filter out events with duplicate summaries
  const uniqueEvents = filteredEventsSummary.filter((event: any) => {
    if (!uniqueSummaries.has(event.summary)) {
      uniqueSummaries.set(event.summary, true);
      return true;
    }
    return false;
  });

  return convertToTableSummary(uniqueEvents);
}

async function handleEvents(receiverEmail: string) {
  const originalEvents = await initializeCalendarService(receiverEmail);
  const events = originalEvents.map((event) => {
    return {
      ...event,
      attendees: event.attendees?.map((attendee) => attendee.email),
    };
  });
  const outputStr = formatEventsSummary(events);
  const channelId = `q8oegpfuxpnr7k8mc4etbben7w`;
  const message = outputStr;
  sendMessage(channelId, message);
  console.log(outputStr);
  return outputStr;
}

export { handleEvents };
