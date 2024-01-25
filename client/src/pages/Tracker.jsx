import "../../node_modules/@syncfusion/ej2-base";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "../index.css";
import {
  GanttComponent,
  Resize,
  Inject,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-gantt";

import { registerLicense } from "@syncfusion/ej2-base";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { nanoid } from "nanoid";

// Registering Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH1ccXRSQ2VfVE13XUs="
);

export const loader = async ({ request, params }) => {
  try {
    const { data } = await customFetch.get(`/projects`);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-projects");
  }
};

function formatCourseDate(date) {
  if (date !== "") {
    const dateObj = new Date(date + "T00:00:00");
    return new Intl.DateTimeFormat("en-US").format(dateObj);
  }
}

function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
}

const getDuration = (firstDate, secondDate) => {
  if (firstDate === "") {
    return 1;
  }

  const modifiedDate1 = formatCourseDate(firstDate);

  const modifiedDate2 = formatCourseDate(secondDate);

  var date1 = new Date(modifiedDate1);

  var date2 = new Date(modifiedDate2);

  var duration =
    Math.ceil(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
  var duration2 = Math.ceil(Math.abs(date2 - date1));

  return duration;
};

const checkIfTrue = (
  item,
  item2,
  item3,
  item4,
  item5,
  item6,
  indexValue,
  subIndexValue,
  taskName1,
  taskName2,
  taskName3
) => {
  let subTaskArray = [];
  if (item !== "") {
    subTaskArray.push({
      TaskID: indexValue + 1 + "." + (subIndexValue + 1.1),
      TaskName: taskName1,
      StartDate: item,

      Duration: getDuration(item, item2),
    });
  }
  if (item3 !== "") {
    subTaskArray.push({
      TaskID: indexValue + 1 + "." + (subIndexValue + 1.2),
      TaskName: taskName2,
      StartDate: item3,

      Duration: getDuration(item3, item4),
    });
  }
  if (item5 !== "") {
    subTaskArray.push({
      TaskID: indexValue + 1 + "." + (subIndexValue + 1.2),
      TaskName: taskName3,
      StartDate: item5,

      Duration: getDuration(item5, item6),
    });
  }
  return subTaskArray;
};

const blob = () => {
  // alert(Date());
  const { projects } = useLoaderData();

  let newProjects = projects.map((project, index) => {
    return {
      TaskID: index + 1,
      ProjectNo: project.projectNumber,
      TaskName: project.projectTitle,

      subtasks: project.workItems.map((workItem, subIndex) => {
        return {
          TaskID: index + 1 + "." + (subIndex + 1),
          TaskName: workItem.name,

          subtasks: checkIfTrue(
            workItem.designStart,
            workItem.designEnd,
            workItem.workshopStart,
            workItem.workshopEnd,
            workItem.siteStart,
            workItem.siteEnd,
            index,
            subIndex,
            "Design",
            "Workshop",
            "Site"
          ),
        };
      }),
    };
  });

  return newProjects;
};

const splitterSettings = {
  position: "35%",
};

const timelineSettings = {
  timelineUnitSize: 80,
  timelineViewMode: "Month",

  bottomTier: {
    unit: "Month",
  },
};

function GanttChart() {
  const { projects } = useLoaderData();
  const GanttData = blob();

  const taskFields = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    duration: "Duration",
    progress: "51",
    child: "subtasks",
  };
  function queryTaskbarInfo(args) {
    if (args.data.TaskName === "Turriff WTW Chloramination Dosing") {
      args.baselineColor = "red";
      args.leftLabelColor = "blue";
      args.progressBarBgColor = "blue";
      args.taskbarBgColor = "red";
      args.taskLabelColor = "red";
      args.taskbarBgColor = "red";
    }
    if (args.data.ProjectNo !== null) {
      args.taskbarBgColor = "#123456";
    }
    if (args.data.Progress > 8) {
      args.progressBarBgColor = "lightgreen";
    }
  }

  return (
    <div className="ganttChart" style={{ position: "fixed" }}>
      <GanttComponent
        dataSource={GanttData}
        taskFields={taskFields}
        height="100%"
        width="100%"
        splitterSettings={splitterSettings}
        allowResizing={false}
        timelineSettings={timelineSettings}
        collapseAllParentTasks={true}
        queryTaskbarInfo={queryTaskbarInfo}
        includeWeekend={true}
      >
        <ColumnsDirective maxWidth="100" minWidth="100" width="100">
          <ColumnDirective
            gridLines="Both"
            field="TaskID"
            width="65"
            maxWidth="65"
            minWidth="65"
          ></ColumnDirective>
          <ColumnDirective
            field="ProjectNo"
            headerText="Project No"
            width="60"
            allowResizing={false}
            maxWidth="60"
            minWidth="60"
          ></ColumnDirective>
          <ColumnDirective
            field="TaskName"
            headerText="Project Title"
            width="200"
            maxWidth="100"
            minWidth="100"
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Resize]} />
      </GanttComponent>
    </div>
  );
}

export default GanttChart;
