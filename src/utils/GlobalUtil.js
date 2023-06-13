import toast from "react-hot-toast";

// convert timestamp to date & time.
// example return: 2022-08-17, 14:43:47
export const convertTimestamp = (timestamp, mode) => {
  if (timestamp === 0) {
    return "-";
  } else {
    const date = new Date(timestamp * 1000);

    if (mode === "date") {
      return date.toLocaleString("en-CA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } else if (mode === "time") {
      return date.toLocaleString("en-CA", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h24",
      });
    } else {
      return date.toLocaleString("en-CA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h24",
      });
    }
  }
};

// convert timestamp to timer
// example return: {"days":0,"hours":36,"minutes":6,"seconds":40}
export const calcTime = (timestamp, mode) => {
  let days = 0;
  let hours = Math.floor(timestamp / (60 * 60));
  let minutes = Math.floor((timestamp % (60 * 60)) / 60);
  let seconds = Math.floor(timestamp % 60);

  if (mode === "day") {
    days = Math.floor(timestamp / (60 * 60 * 24));
    hours = Math.floor((timestamp % (60 * 60 * 24)) / (60 * 60));
  }

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

// returnTime
export const returnTime = (duration) => {
  const { days, hours, minutes, seconds } = calcTime(duration);

  return !seconds
    ? 0
    : !minutes
    ? seconds
    : !hours
    ? minutes + ":" + seconds
    : !days
    ? hours + ":" + minutes + ":" + seconds
    : days + "-" + hours + ":" + minutes + ":" + seconds;
};

// copy to clipboard
export const copyToClipboard = (text) => {
  try {
    navigator.clipboard.writeText(text).then(
      function () {
        toast.success("Successfully Copied!", {
          duration: 1000,
          position: "bottom-left",
        });
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  } catch {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    toast.success("Successfully Copied!", {
      duration: 1000,
      position: "bottom-left",
    });
  }
};

// create Cookie
export const createCookie = (access_token, exp_day) => {
  const d = new Date();
  d.setTime(d.getTime() + exp_day * 24 * 60 * 60 * 1000);
  const cookieData = {
    data: `access_token=${access_token}`,
    expires: `expires=${d.toUTCString()}`,
    path: "path=/",
    SameSite: "SameSite=None", //None //Lax //Strict //Lax
    Secure: "Secure", //Secure
    HttpOnly: "", //HttpOnly
    Domain: "Domain=",
  };
  document.cookie = `${cookieData.data}; ${cookieData.expires}; ${cookieData.path}; ${cookieData.SameSite}; ${cookieData.Secure}; ${cookieData.HttpOnly}; ${cookieData.Domain};`;
};

// getAccessToken
export const getAccessToken = () => {
  return document.cookie.split("=")[1];
};

// form validation function
export const validation = (formObject) => {
  for (const key in formObject) {
    // get item from form object
    const item = formObject[key];

    try {
      // check item is required
      const isRequired = item.required;
      if (isRequired) {
        // check if data is list or string and check it length
        if ((typeof item.value === "object" && !item.value.length) || (typeof item.value === "string" && !item.value.length)) {
          toast(item.msgError, {
            icon: "⚠️",
          });
          return false;
        }
        // check if data is number and check it value
        else if (typeof item.value === "number" && item.value <= 0) {
          toast(item.msgError, {
            icon: "⚠️",
          });
          return false;
        }
      }
    } catch (error) {
      toast.error("Something wrong!");
    }
  }

  // return true if every thing is ok
  return true;
};

export const checkInvalidItems = (formObject) => {
  let list = [];
  for (const key in formObject) {
    const item = formObject[key];
    const isRequired = item.required;

    if (isRequired) {
      if (
        (typeof item.value === "object" && !item.value?.length) ||
        (typeof item.value === "string" && item.value === "") ||
        (typeof item.value === "number" && item.value <= 0)
      ) {
        list.push(item.name);
      }
    }
  }
  return list;
};

export const clearForm = (formObject, setFormObject) => {
  for (const key in formObject) {
    const item = formObject[key];

    if (item.value) {
      if (typeof item.value === "string") {
        if (item.fieldType === "upload") {
          setFormObject((prev) => ({ ...prev, [key]: { ...prev[key], value: "", fileName: item.placeholder, fileList: [] } }));
        }
        setFormObject((prev) => ({ ...prev, [key]: { ...prev[key], value: "" } }));
      } else if (typeof item.value === "number") {
        if (item.fieldType === "dateTime") {
          setFormObject((prev) => ({ ...prev, [key]: { ...prev[key], value: new Date().getTime() } }));
        } else {
          setFormObject((prev) => ({ ...prev, [key]: { ...prev[key], value: 0 } }));
        }
      } else if (typeof item.value === "object") {
        if (item.fieldType === "upload") {
          setFormObject((prev) => ({ ...prev, [key]: { ...prev[key], value: "", fileName: item.placeholder, fileList: [] } }));
        }
        setFormObject((prev) => ({ ...prev, [key]: { ...prev[key], value: [] } }));
      }
    }
    if (item.current_value) {
      if (typeof item.current_value === "string") {
        setFormObject((prev) => ({ ...prev, [key]: { ...prev[key], current_value: "" } }));
      }
    }
    if (item.cover_preview) {
      if (typeof item.cover_preview === "string") {
        setFormObject((prev) => ({ ...prev, [key]: { ...prev[key], cover_preview: "" } }));
      }
    }
  }
};

export const prepareFormObject = (formData) => {
  let formObject = {};
  Object.keys(formData).forEach((key, index) => {
    if (formData[key].fieldType === "dateTime") {
      const seconds = formData[key].value / 1000;
      formObject[key] = seconds;
    } else {
      formObject[key] = formData[key].value;
    }
  });

  return formObject;
};

// requestHandler
export const requestHandler = async (reqFunction, data, setLoader, thenMessage, catchMessage) => {
  try {
    let result = {
      status: false,
      data: null,
    };
    if (setLoader) setLoader(true);

    await reqFunction(data)
      .then((response) => {
        if (thenMessage) toast.success(thenMessage);
        if (setLoader) setLoader(false);
        result = {
          status: true,
          data: response.data,
        };
      })
      .catch((error) => {
        if (catchMessage) toast.error(catchMessage);
        if (setLoader) setLoader(false);
      });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// ScrollUp
export const ScrollUp = (element) => {
  document.querySelector(element).scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
