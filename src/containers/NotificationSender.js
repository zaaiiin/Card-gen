import React, { useState, useEffect } from "react";
import addNotification from "react-push-notification";
import small_logo from "../assets/small_logo.png";

const NotificationSender = (props) => {
  const { submittedData, reminderDates } = props;

  const reminderNotification = (message) => {
    addNotification({
      title: "CardGen Reminder",
      message: message,
      theme: "darkblue",
      vibrate: [2],
      icon: small_logo,
      duration: 6000,
      native: true,
      onClick: () => console.log("hello"),
    });
  };

  function sendNotif(reminderDate, data) {
    const today = new Date().toLocaleDateString();

    const { birthday, anniversary, othereventdate, firstname, reminder, id } =
      data;

    const inZeroDays = reminder === "0";
    const inOneDay = reminder === "1";
    const inThreeDays = reminder === "3";
    const inOneWeek = reminder === "7";

    let message;
    if (reminderDate === today) {
      if (inZeroDays) {
        if (birthday) {
          message = `Today is ${firstname}'s birthday!`;
        } else if (anniversary) {
          message = `Today is ${firstname}'s anniversary!`;
        } else if (othereventdate) {
          message = `You have an important event today!`;
        }
      }

      if (inOneDay) {
        if (birthday) {
          message = `Tomorrow is ${firstname}'s birthday!`;
        } else if (anniversary) {
          message = `Tomorrow is ${firstname}'s anniversary!`;
        } else if (othereventdate) {
          message = `You have an important event tomorrow!`;
        }
      }

      if (inThreeDays) {
        if (birthday) {
          message = `${firstname}'s birthday is in three days!`;
        } else if (anniversary) {
          message = `${firstname}'s anniversary is in three days!`;
        } else if (othereventdate) {
          message = `You have an important event coming up in three days!`;
        }
      }

      if (inOneWeek) {
        if (birthday) {
          message = `${firstname}'s birthday is in a week!`;
        } else if (anniversary) {
          message = `${firstname}'s anniversary is in a week!`;
        } else if (othereventdate) {
          message = `You have an important event coming up in a week!`;
        }
      }
      console.log("changed");
      window.sessionStorage.setItem(id, "sent");
      console.log(window.sessionStorage.getItem(id));
      reminderNotification(message);
    }
  }

  useEffect(() => {
    if (Array.isArray(submittedData) && submittedData.length > 0) {
      const today = new Date().toLocaleDateString();
      props.reminderDates.forEach((date, index) => {
        if (date === today) {
          console.log(props.submittedData[index]);
          if (
            window.sessionStorage.getItem(props.submittedData[index].id) !==
            "sent"
          ) {
            sendNotif(date, props.submittedData[index]);
          }
        }
      });
      // setNotificationSentToday(true);
    }
  }, [props.reminderDates]);
  console.log(reminderDates);
};

export default React.memo(NotificationSender);
