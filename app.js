const exec = require('child_process').exec
const {variables, services} = require('./config')

const replaceVariables = (content, variables) => {
  return content.replace(/\$\{(\w+)}/g, (match, key) => {
    // If the variable is undefined, leave it as is
    return variables[key] || match
  })
}

// Check and keep tasks
for (const service of services) {

  const {checkCmd, includes, resetCmd, successMsg, failureMsg} = {...service}

  exec(replaceVariables(checkCmd, variables), (err, stdout) => {
    if (!stdout.includes(includes)) {
      exec(replaceVariables(resetCmd, variables), (err) => {
        const currentDate = new Date()
        const formattedDate = currentDate.toLocaleDateString()
        const formattedTime = currentDate.toLocaleTimeString()
        if (err) {
          console.error(`${formattedDate}, ${formattedTime}: ${failureMsg}: ${err}`)
        } else {
          console.log(`${formattedDate}, ${formattedTime}: ${successMsg}`)
        }
      })
    }
  })
}
