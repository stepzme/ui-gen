import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { styled, type VariantProps } from '@/styles/stitches.config'

/**
 * Button component using Stitches with Figma tokens
 * 
 * Based on analysis:
 * - Current implementation: Tailwind + CVA with variant/semantic/size
 * - Figma structure: variant (filled/outlined/tonned/transparent) + colorScheme + paddingSize + extraPaddings + fill/hug + state
 * - Tokens: --components-button-filled-{colorScheme}-body-{state}
 * 
 * Unified approach:
 * - variant: filled | outlined | tonned | transparent (maps to old primary/secondary/tertiary/text)
 * - colorScheme: brand | success | info | warning | critical | neutral | primary | constant
 * - paddingSize: medium | small | tiny (maps to old default/sm/lg)
 * - extraPaddings: boolean
 * - fullWidth: boolean (maps to fill/hug from Figma)
 */

const ButtonBase = styled('button', {
  // Base styles from Figma analysis
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$space$body-m-medium', // 16px - matches Figma gap (gravity system)
  whiteSpace: 'nowrap',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'all 0.2s ease-in-out',
  
  // Typography from Figma: bodyM/tight/medium
  fontFamily: '$fonts$body',
  fontSize: '$fontSizes$bodyM', // 16px
  fontWeight: '$fontWeights$medium', // 500 (bodyMedium is a string token)
  lineHeight: '$lineHeights$body-m-tight', // 20px
  textAlign: 'center',
  
  // Disabled state
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  
  // Focus styles
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '$colors$brand-primary',
    outlineOffset: '2px',
  },
  
  // SVG icon styles
  '& svg': {
    pointerEvents: 'none',
    flexShrink: 0,
    width: '$space$body-m-medium', // 16px
    height: '$space$body-m-medium', // 16px
  },
  
  variants: {
    variant: {
      filled: {},
      outlined: {},
      tonned: {},
      transparent: {},
    },
    
    colorScheme: {
      brand: {},
      success: {},
      info: {},
      warning: {},
      critical: {},
      neutral: {},
      primary: {},
      constant: {},
    },
    
    paddingSize: {
      medium: {
        padding: '$space$body-m-medium', // 16px - matches Figma gravity system
        borderRadius: '$radii$body-m-medium', // 12px - matches Figma
      },
      small: {
        padding: '$space$body-m-small', // 12px - matches Figma gravity system
        borderRadius: '$radii$body-m-small', // 12px (body-m-small is 12px, not 8px)
        fontSize: '$fontSizes$bodyS', // 12px
        lineHeight: '$lineHeights$body-s-tight', // 16px
      },
      tiny: {
        padding: '$space$body-m-tiny', // 8px - matches Figma gravity system
        borderRadius: '$radii$body-m-tiny', // 8px
        fontSize: '$fontSizes$bodyS', // 12px
        lineHeight: '$lineHeights$body-s-tight', // 16px
      },
    },
    
    extraPaddings: {
      true: {
        // Additional padding when true - handled in compoundVariants
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: 'auto',
      },
    },
  },
  
  compoundVariants: [
    // Filled variant combinations
    {
      variant: 'filled',
      colorScheme: 'brand',
      css: {
        backgroundColor: '$colors$button-filled-brand-body-normal',
        color: '$colors$button-filled-text',
        '&:hover': {
          backgroundColor: '$colors$button-filled-brand-body-hover',
        },
        '&:active': {
          backgroundColor: '$colors$button-filled-brand-body-click',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'success',
      css: {
        backgroundColor: '$colors$button-filled-success-body-normal',
        color: '$colors$button-filled-text',
        '&:hover': {
          backgroundColor: '$colors$button-filled-success-body-hover',
        },
        '&:active': {
          backgroundColor: '$colors$button-filled-success-body-click',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'info',
      css: {
        backgroundColor: '$colors$button-filled-info-body-normal',
        color: '$colors$button-filled-text',
        '&:hover': {
          backgroundColor: '$colors$button-filled-info-body-hover',
        },
        '&:active': {
          backgroundColor: '$colors$button-filled-info-body-click',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'warning',
      css: {
        backgroundColor: '$colors$button-filled-warning-body-normal',
        color: '$colors$button-filled-text',
        '&:hover': {
          backgroundColor: '$colors$button-filled-warning-body-hover',
        },
        '&:active': {
          backgroundColor: '$colors$button-filled-warning-body-click',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'critical',
      css: {
        backgroundColor: '$colors$button-filled-critical-body-normal',
        color: '$colors$button-filled-text',
        '&:hover': {
          backgroundColor: '$colors$button-filled-critical-body-hover',
        },
        '&:active': {
          backgroundColor: '$colors$button-filled-critical-body-click',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'neutral',
      css: {
        backgroundColor: '$colors$button-filled-neutral-body-normal',
        color: '$colors$button-filled-text',
        '&:hover': {
          backgroundColor: '$colors$button-filled-neutral-body-hover',
        },
        '&:active': {
          backgroundColor: '$colors$button-filled-neutral-body-click',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'primary',
      css: {
        backgroundColor: '$colors$button-filled-primary-body-normal',
        color: '$colors$button-filled-primary-text',
        '&:hover': {
          backgroundColor: '$colors$button-filled-primary-body-hover',
        },
        '&:active': {
          backgroundColor: '$colors$button-filled-primary-body-click',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'constant',
      css: {
        backgroundColor: '$colors$button-filled-constant-body-normal',
        color: '$colors$button-filled-constant-text',
        '&:hover': {
          backgroundColor: '$colors$button-filled-constant-body-hover',
        },
        '&:active': {
          backgroundColor: '$colors$button-filled-constant-body-click',
        },
      },
    },
    
    // Padding size adjustments for extraPaddings
    {
      paddingSize: 'medium',
      extraPaddings: true,
      css: {
        paddingLeft: '$space$body-m-large', // 20px
        paddingRight: '$space$body-m-large', // 20px
      },
    },
    {
      paddingSize: 'small',
      extraPaddings: true,
      css: {
        paddingLeft: '$space$body-m-medium', // 16px
        paddingRight: '$space$body-m-medium', // 16px
      },
    },
    {
      paddingSize: 'tiny',
      extraPaddings: true,
      css: {
        paddingLeft: '$space$body-m-small', // 12px
        paddingRight: '$space$body-m-small', // 12px
      },
    },
  ],
  
  defaultVariants: {
    variant: 'filled',
    colorScheme: 'brand',
    paddingSize: 'medium',
    extraPaddings: false,
    fullWidth: false,
  },
})

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof ButtonBase>,
    VariantProps<typeof ButtonBase> {
  asChild?: boolean
}

const Button = React.forwardRef<
  React.ElementRef<typeof ButtonBase>,
  ButtonProps
>(({ asChild, children, ...props }, ref) => {
  if (asChild) {
    return (
      <Slot ref={ref}>
        <ButtonBase {...props}>{children}</ButtonBase>
      </Slot>
    )
  }

  return (
    <ButtonBase ref={ref} {...props}>
      {children}
    </ButtonBase>
  )
})

Button.displayName = 'Button'

export { Button, ButtonBase }

