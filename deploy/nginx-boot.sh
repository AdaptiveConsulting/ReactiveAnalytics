#!/bin/sh

# Guard against accidentally running outside of Docker container and replacing crontabs on a host system
if [ ! -f /proc/1/cgroup ] || ! grep -qa -E '(docker|kubepods)' /proc/1/cgroup; then
    echo "$0 must never be run outside of docker container"
    exit 1
fi

# Schedule a job to reload NGINX config every 60 seconds
echo '*/1     *       *       *       *       nginx -s reload' | crontab -

# Start cron daemon in the background, attach it to the current shell's stderr/stdout
crond -f -d 6 &

# Listen on SIGTERM signal and terminate all background processes gracefully
# Exit code is 143 == 128 + 15 (SIGTERM)
trap 'echo "Stopping cron..."; kill "$(cat /var/run/crond.pid)"; echo "Stopping nginx..."; nginx -s quit; exit 143' SIGTERM

# Push nginx into the background while still attached to stdout/stderr and wait until it terminates
# This returns control to the current shell, so that the trap above can handle a SIGTERM from docker host
nginx -g "daemon off;" & wait ${!}