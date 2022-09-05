# Office Notice Board

Summary TBD

## Todo

Software:

- Nicely format config and display websites
- Fix: Display doesn't show the correct time on the RPi
- Set four states in dropdown w/ text only to select between them
  - Four states: On call (dnd), working, not home, custom text/drawing (bring me cookies)
- Display should be smart enough to check for state changes even if config server restarts
- Cleanup code
- Readme update
- Figure out scheduler and backlight timer stuff

With localmode enabled: `balena push 135c5f2.local --env KIOSK=1 PERSISTENT=1 LAUNCH_URL='http://localhost:3000'`

Hardware & Mounting:

- LCD Screen: Weatherized and mounted right outside the guest house by the door.
  - 3D printed case?
  - Power? – Solar Panel
- Expense everything later in the year

Post MVP:

- Automatically detect if I'm in a conference call or not
- If in a conference call, update the text so Camille knows if I'm in a meeting or she can come in
- Start here? <https://github.com/henrik242/OnAir>
- Blog post

## Highlights

## Motivation

## Supported Devices

Office Notice Board has been tested on the following devices:

| Device Type      | Status |
| ---------------- | ------ |
| Raspberry Pi 3b+ | ✔      |
| Raspberry Pi 4   |        |

It may support others—please let me know if you test on another device!

## Equipment

## System Overview

## Fleet Variables

KIOSK=1
LAUNCH_URL=''
PERSISTENT=1

## `backend-server` service

## `sign-server` service

## `browser` service

## `fbcp` service

## Getting Help

If you're having any problem, please [raise an issue](https://github.com/rhampt/office-notice-board/issues/new) on GitHub and I will be happy to help. You can also find help on the balenaForums.

## Contributing

Do you want to help make Office Notice Board better? Take a look at our [Contributing Guide](CONTRIBUTING).

## License

Office Notice Board is free software, and may be redistributed under the terms specified in the [License](LICENSE).
