import React from "react"
import { createStateDesigner, useStateDesigner } from "state-designer"
import { SendInput } from "./components/SendInput"
import { SendButton } from "./components/SendButton"
import { Card } from "./components/Card"
import { Visualizer } from "./components/Visualizer"
import {
  Input,
  Flex,
  Text,
  Box,
  Button,
  IconButton
} from "@theme-ui/components"

export interface Props {}

export const OnEvent: React.FC<Props> = ({ children }) => {
  const designer = createStateDesigner({
    data: {
      clicks: 0,
      count: 0
    },
    onEvent: "incrementClicks",
    actions: {
      incrementClicks: data => data.clicks++,
      incrementCount: data => data.count++,
      decrementCount: data => data.count--
    },
    on: {
      CLICKED_MINUS: "decrementCount",
      CLICKED_PLUS: "incrementCount"
    }
  })

  const [data, send, { can, isIn }] = useStateDesigner(designer)

  return (
    <Box mb={5}>
      <Visualizer title="Template" designer={designer} />
      <Card p={3}></Card>
    </Box>
  )
}
