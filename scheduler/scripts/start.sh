#!/bin/bash
if [ ! -z ${ENABLE_BACKLIGHT_TIMER+x} ] && [ "$ENABLE_BACKLIGHT_TIMER" -eq "1" ]
then
  (crontab -l; echo "${BACKLIGHT_ON:-0 6 * * *} /usr/src/backlight_on.sh") | crontab -
  (crontab -l; echo "${BACKLIGHT_OFF:-0 18 * * *} /usr/src/backlight_off.sh") | crontab -
fi

crond -f
