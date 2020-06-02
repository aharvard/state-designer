/**
 * This file contains low-level components to use in demo projects and tutorials for `state-designer`.
 * Because those demos are focused on state management, rather than presentation and styling, these
 * components wrap lower-level components and provide default props that would normally be given inline.
 * A regular project would not include this layer of abstraction.
 *
 */

import * as React from "react"
import { useLocation, Link } from "react-router-dom"
import {
  Button,
  Divider,
  Checkbox as Cb,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Text,
  Image,
  Input,
  Stack,
  Switch,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Link as CLink,
} from "@chakra-ui/core"
import routes from "routes"

// Helper function to provide default props to low-level components

const withDefaultProps = (C, defaults = {}) => (props) => {
  const { colorMode } = useColorMode()
  const p = { ...props, colorMode }
  const d = typeof defaults === "function" ? defaults(p) : defaults
  return <C {...d} {...p} style={{ ...d.style, ...p.style }} />
}

// Generic

export const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Stack align="center" justify="center" isInline spacing={2}>
      <Icon name="sun" size={5} />
      <Switch
        isChecked={colorMode === "light"}
        onChange={toggleColorMode}
        h={5}
      />
    </Stack>
  )
}

export const Lockup = withDefaultProps(Image, (p) => ({
  src: p.colorMode === "dark" ? "lockup-light.svg" : "lockup-dark.svg",
  h: 4,
}))

export const TitleBar = ({ children }) => {
  const { colorMode } = useColorMode()
  const { pathname } = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  return (
    <>
      <Flex
        mb={4}
        px={[0, 1, 4]}
        py={3}
        position="sticky"
        align="center"
        justify="space-between"
        top={0}
        bg={colorMode === "dark" ? "gray.800" : "#fff"}
        zIndex="999"
      >
        <Flex align="center">
          <Button
            ref={btnRef}
            variantColor="blue"
            onClick={onOpen}
            size="md"
            variant="link"
            lineHeight="1"
            m={0}
          >
            tutorials/
          </Button>
          <Heading as="h1" mt={1} size={"s"} lineHeight="1" m={0}>
            {pathname.slice(1)}
          </Heading>
        </Flex>
        <ColorModeSwitch />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tutorials</DrawerHeader>

          <DrawerBody>
            <Grid
              templateColumns="min-content 1fr"
              autoFlow="column"
              columnGap={4}
              rowGap={[4, 2]}
            >
              {routes.map(({ name }, i) => {
                const isStarterActive = pathname === `/${name}-starter`
                const isCompleteActive = pathname === `/${name}-complete`
                return (
                  <React.Fragment key={i}>
                    <Text gridColumn={1}>
                      <b>{name}</b>
                    </Text>
                    <HStack gridColumn={2} w="fit-content">
                      <CLink
                        to={`/${name}-starter`}
                        as={Link}
                        textDecor={isStarterActive ? "underline" : "inherit"}
                      >
                        starter
                      </CLink>
                      /
                      <CLink
                        to={`/${name}-complete`}
                        as={Link}
                        textDecor={isCompleteActive ? "underline" : "inherit"}
                      >
                        complete
                      </CLink>
                    </HStack>
                  </React.Fragment>
                )
              })}
            </Grid>
          </DrawerBody>
          <DrawerFooter>
            <CLink href="https://state-designer.com" />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export function Footer() {
  return (
    <VStack w="100%" justifyItems="center" textAlign="center" mt={40}>
      <CLink isExternal href="https://state-designer.com/" ml={1}>
        <Lockup />
      </CLink>
      <HStack w="fit-content" alignItems="center" justifySelf="center" gap={2}>
        <CLink isExternal href="https://state-designer.com/" ml={1}>
          Docs
          <Icon name="external-link" mb={"3px"} mx={2} opacity={0.5} />
        </CLink>
        <CLink isExternal href="https://github.com/steveruizok/state-designer">
          Github
          <Icon name="external-link" mb={"3px"} ml={2} mr={0} opacity={0.5} />
        </CLink>
      </HStack>
      <VStack opacity={0.5} textAlign="center" justifyContent="center" gap={0}>
        <Text fontSize="sm">Copyright © 2020 </Text>
        <CLink fontSize="sm" isExternal href="https://twitter.com/steveruizok">
          Steve Ruiz
        </CLink>
      </VStack>
    </VStack>
  )
}

export const Layout = withDefaultProps(Grid, (p) => ({
  p: 4,
  borderRadius: 8,
  width: "100%",
  maxWidth: 700,
  margin: "0 auto",
  boxShadow: "0 4px 12px -4px rgba(0,0,5,.05)",
  borderWidth: 1,
  borderStyle: "solid",
  autoRows: "min-content",
  borderColor: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.200",
  bg: p.colorMode === "dark" ? "whiteAlpha.100" : "gray.50",
  overflow: "hidden",
}))

export const TightLayout = withDefaultProps(Layout, {
  width: "260px",
  alignItems: "center",
  my: 10,
})

export const TwoColumnLayout = withDefaultProps(Layout, (p) => ({
  templateColumns: "auto 1fr",
}))

export const HStack = withDefaultProps(Grid, (p) => ({
  gridAutoFlow: "column",
  templateRows: "1fr",
  alignItems: "center",
  width: "fit-content",
  gridGap: p.gap === undefined ? 2 : p.gap,
}))

export const VStack = withDefaultProps(Grid, (p) => ({
  gridAutoFlow: "row",
  templateColumns: "1fr",
  autoRows: "min-content",
  alignItems: "flex-start",
  height: "fit-content",
  justifyContent: p.justify || "center",
  gridGap: p.gap === undefined ? 2 : p.gap,
}))

export const PrimaryButton = withDefaultProps(Button, {
  variantColor: "blue",
})

export const NavButton = withDefaultProps(Button, (p) => ({
  variant: "ghost",
  style: { textDecoration: p.active ? "underline" : "none" },
}))

export const Value = withDefaultProps(Heading, {
  m: 0,
  p: 0,
  maxWidth: "100%",
  overflow: "hidden",
  lineHeight: 1,
  textAlign: "center",
})

// Todo

export const TodoContainer = withDefaultProps(Grid, {
  templateColumns: "32px 1fr",
  gap: 2,
  alignItems: "center",
})

export const RemoveButton = withDefaultProps(IconButton, {
  variant: "ghost",
  size: "sm",
  ariaLabel: "Remove Todo",
  icon: "close",
  color: "blue.500",
})

export const Checkbox = (props) => {
  return (
    <Flex align="center" justify="center">
      <Cb
        size="lg"
        borderColor="blue.500"
        opacity={props.disabled ? 0.5 : 1}
        {...props}
      />
    </Flex>
  )
}

export const TextInput = withDefaultProps(Input, {
  h: 10,
})

// Counter

export const CounterLayout = withDefaultProps(TightLayout, {
  templateColumns: "min-content 1fr min-content",
  alignItems: "center",
})

export const Count = withDefaultProps(Value, {})

export const PlusButton = withDefaultProps(IconButton, {
  icon: "add",
  arialLabel: "Increase",
  variantColor: "blue",
})

export const MinusButton = withDefaultProps(IconButton, {
  icon: "minus",
  arialLabel: "Decrease",
  variantColor: "blue",
})

// Toggle

export const ToggleLayout = withDefaultProps(TightLayout, {
  textAlign: "center",
  gap: 3,
})

export const Toggle = withDefaultProps(Switch, (p) => ({
  isChecked: p.isToggled,
  size: "lg",
}))

export const Label = withDefaultProps(Heading, {
  m: 0,
  as: "h2",
  size: "md",
  p: 0,
  lineHeight: 1,
  textAlign: "center",
})

// Input

export const InputLayout = withDefaultProps(TightLayout, {
  width: "320px",
  textAlign: "center",
  autoRows: "min-content",
  rowGap: 4,
})

export const InputRow = withDefaultProps(HStack, {
  templateColumns: "64px 1fr",
  textAlign: "left",
  gap: 4,
  width: "100%",
})

export const SubHeading = withDefaultProps(Heading, {
  size: "sm",
  mb: 3,
})

// Timer

export const TimerLayout = withDefaultProps(TightLayout, {
  templateColumns: "1fr 1fr 1fr min-content",
  width: "320px",
  autoRows: "min-content",
  columnGap: 2,
  rowGap: 4,
})

export const Time = withDefaultProps(Heading, {
  gridColumn: "span 4",
  textAlign: "center",
})

export const ResetButton = withDefaultProps(IconButton, {
  icon: "repeat-clock",
})

export { Button, Divider, Heading, IconButton, Switch }
