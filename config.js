const config = {
  variables: {
    user: "ubuntu"
  },
  services: [
    {
      name: "xray",
      checkCmd: "pgrep -laf xray",
      includes: "xray",
      resetCmd: "/home/${user}/xray/xray -c /home/${user}/xray/config.json",
      successMsg: "xray keep alive success",
      failureMsg: "xray keep alive failed"
    },
    {
      name: "acme.sh",
      checkCmd: "crontab -l 2>/dev/null",
      includes: "acme.sh",
      resetCmd: "(crontab -l 2>/dev/null; echo '30 11 * * * /home/${user}/.acme.sh/acme.sh --cron --home /home/${user}/.acme.sh > /dev/null') | crontab -",
      successMsg: "acme.sh crontab add success",
      failureMsg: "acme.sh crontab add failed"
    }
  ]
}

module.exports = config
