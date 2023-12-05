import {
  Text,
  ThemeTokens,
  XStack,
  createStyledContext,
  styled,
  withStaticProperties,
} from 'tamagui'
import { useContext, cloneElement, ReactElement } from 'react'
import { useGroupPseudoState } from './useGroupPseudoState'
import { usePathname } from './usePathname'

const NavLinkVariantContext = createStyledContext({
  isActiveNavlink: false,
})

const NavButtonCore = styled(XStack, {
  name: 'NavButton',
  group: 'navbutton',

  borderWidth: '$1',
  borderStyle: 'solid',
  borderColor: 'transparent',
  backgroundColor: '$background',
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  gap: '$4',
  cursor: 'pointer',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
  pressStyle: {
    backgroundColor: '$backgroundPress',
    borderColor: '$blue8',
  },

  variants: {
    isActiveNavlink: {
      true: {
        borderColor: '$blue8',
      },
      false: {},
    },
  } as const,

  defaultVariants: {
    isActiveNavlink: false,
  },
})

const NavButtonText = styled(Text, {
  context: NavLinkVariantContext,

  unstyled: true,
  color: '$color',

  '$group-navbutton-hover': {
    color: '$blue8',
  },
  '$group-navbutton-press': {
    color: '$blue8',
  },

  variants: {
    isActiveNavlink: {
      true: {
        color: '$blue8',
      },
      false: {},
    },
  } as const,
})

const NavButtonIcon = ({ children, color }: { children: ReactElement; color?: ThemeTokens }) => {
  const { isActiveNavlink } = useContext(NavLinkVariantContext.context)
  const { hover, press } = useGroupPseudoState('navbutton')
  const isHoveredOrPressed = hover || press

  return cloneElement(children, {
    color: color ?? (isActiveNavlink || isHoveredOrPressed ? '$blue8' : '$color'),
    size: '$1',
  })
}

export const NavButton = withStaticProperties(
  NavButtonCore.styleable<{ href: string }>(({ href, ...props }, ref) => {
    const pathname = usePathname()
    const isActiveNavlink = pathname === href

    return (
      <NavButtonCore
        isActiveNavlink={isActiveNavlink}
        // Uncomment these event handlers to see the behavior of
        // hover/press change:
        //
        // onPress={() => {
        //   console.log(`navigate to ${href}...`)
        // }}
        // onHoverIn={() => {}}
        {...props}
        ref={ref}
      />
    )
  }),
  {
    Text: NavButtonText,
    Icon: NavButtonIcon,
  }
)
