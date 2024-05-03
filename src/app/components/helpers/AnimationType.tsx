'use client'

import { TypeAnimation } from "react-type-animation"

export const AnimationType = () => {
  return (
    <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Jhalddry",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Frontend Developer",
                1000,
                "Next React Express",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
  )
}
