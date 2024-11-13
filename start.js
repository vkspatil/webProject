const { exec } = require("child_process");
const platform = process.platform;

let command;

if (platform === "win32") {
  command = "set PORT=3000 && react-scripts start";
} else {
  command = "PORT=3000 react-scripts start";
}

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
