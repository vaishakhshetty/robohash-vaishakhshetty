var fs = require("fs");
const superagent = require("superagent");

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
length = 5;

//function to generate a random string
function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

let roboText = generateString(length);
console.log(roboText);

//write file function -
fs.writeFile("roboText.txt", roboText, (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully");
  }
});

//Callback -
fs.readFile("./roboText.txt", (err, data) => {
  if (err) {
    console.log("error in reading the file", err.message);
    return;
  }
  console.log(`the random text generated is ${data}`);
  superagent.get(`https://robohash.org/${data}`).end((res) => {
    console.log(res.body.message);
    fs.writeFile("./roboImage.txt", res.body.message, (err) => {
      if (err) {
        console.log("not able to write robot image to the file", err);
        return;
      }
      console.log("robot image successfully written inside the file");
    });
  });
});
