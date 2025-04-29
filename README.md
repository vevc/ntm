# ntm (Node.js task manager)

This is a simple task management program implemented in Node.js, designed primarily for keeping processes alive on Linux and resetting cron rules.

Originally, I used it to dynamically initialize crontab rules inside a Docker container to prevent the loss of scheduled tasks when the container restarts.