const axios = require("axios");

exports.send = (number, message) =>
  axios
    .post("https://textbelt.com/text", {
      phone: number,
      message: message,
      key: "378b69b65c61f313a692fcc749fd954eb9e98b9dmmt5KBK5m4vZ6KoXwoEyduxVx",
    })
    .then((response) => {
      console.log(response.data);
    });
