import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import "./timeline.scss";
import TechIcon from "./TechIcon";
import "@mui/lab/themeAugmentation";
import BusinessIcon from "@mui/icons-material/Business";
import {
  CalendarMonth,
  Flag,
  Home,
  LocationCity,
  WorkHistoryOutlined,
} from "@mui/icons-material";
import { Fab, Typography } from "@mui/material";
import { workHistoryData } from "./workHistoryData";
import { Link } from "react-router-dom";

const WorkHistory: React.FC = () => {
  return (
    <>
      <Timeline>
        {workHistoryData.map((company, index) => (
          <>
            <TimelineItem>
              <TimelineOppositeContent></TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="filled" color="warning">
                  <BusinessIcon />
                </TimelineDot>
                <TimelineConnector />
                {/* <span>{company.company}</span> */}
                {/* {index !== workHistoryData.length - 1 && <TimelineConnector />} */}
              </TimelineSeparator>
              <TimelineContent>
                <Typography fontSize="1.5em">{company.company}</Typography>
              </TimelineContent>
            </TimelineItem>
            {company.positions.map((position, index2) => (
              <>
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    <LocationCity /> {position.location} <br />
                    <CalendarMonth />
                    {position.startDate.toLocaleDateString("default", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {position.endDate
                      ? position.endDate.toLocaleDateString("default", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Present"}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot variant="outlined" color="success">
                      <WorkHistoryOutlined />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography className="job-title">
                      {position.title}
                      <br />
                      {position.team}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                {position.projects.map((project, index3) => (
                  <TimelineItem key={index3}>
                    <TimelineOppositeContent>
                      <Typography fontStyle="italic">
                        {project.skills.join(", ")}
                      </Typography>
                      <Typography>
                        {project.technologies.map((tech) => (
                          <TechIcon tech={tech} />
                        ))}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot variant="outlined" color="primary" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography color="">
                        <b>{project.title}</b>: {project.description}
                        {project?.links && (
                          <div>
                            {project.links.map((link) => (
                              <a href={link.url} target="_blank">
                                {link.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </>
            ))}
          </>
        ))}
        <TimelineItem>
          <TimelineOppositeContent></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="filled" color="warning">
              <Flag />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>
      </Timeline>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Fab
          color="primary"
          aria-label="home"
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          <Home titleAccess="Back to Home" />
        </Fab>
      </Link>
    </>
  );
};

export default WorkHistory;
