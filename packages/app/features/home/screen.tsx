import { Button, H1, Paragraph, Sheet, useToastController, XStack, YStack } from '@my/ui'
import { NavButton } from '@my/ui'
import {
  ChevronDown,
  ListStart,
  FileHeart,
  ChevronUp,
  Home,
  BarChart2,
} from '@tamagui/lucide-icons'
import React, { useState } from 'react'

export function HomeScreen() {
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Tamagui Group Issue</H1>
        <Paragraph>
          Open 'NavButton' from the ui package and uncomment the event handler props to see the
          behavior below change:
        </Paragraph>
        <NavButton href="/">
          <NavButton.Icon>
            <Home />
          </NavButton.Icon>
          <NavButton.Text>Home</NavButton.Text>
        </NavButton>
        <NavButton href="/foo">
          <NavButton.Icon>
            <ListStart />
          </NavButton.Icon>
          <NavButton.Text>Foo</NavButton.Text>
        </NavButton>
        <NavButton href="/bar">
          <NavButton.Icon>
            <FileHeart />
          </NavButton.Icon>
          <NavButton.Text>Bar</NavButton.Text>
        </NavButton>
        <NavButton href="/baz">
          <NavButton.Icon>
            <BarChart2 />
          </NavButton.Icon>
          <NavButton.Text>Baz</NavButton.Text>
        </NavButton>
      </YStack>
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
