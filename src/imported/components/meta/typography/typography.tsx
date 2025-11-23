import * as React from 'react'
import { styled } from '@/imported/styles/stitches.config'
import { typography as typographyStyles } from '@/imported/styles/stitches.config'

export type TypographyVariant =
  | 'inherit'
  | 'displayXL'
  | 'displayL'
  | 'displayM'
  | 'displayS'
  | 'headlineXL'
  | 'headlineL'
  | 'headlineM'
  | 'headlineS'
  | 'headlineXS'
  | 'headlineXXS'
  | 'bodyXL_tight_normal'
  | 'bodyXL_tight_medium'
  | 'bodyXL_tight_semiBold'
  | 'bodyXL_paragraph_normal'
  | 'bodyXL_paragraph_medium'
  | 'bodyXL_paragraph_semiBold'
  | 'bodyL_tight_normal'
  | 'bodyL_tight_medium'
  | 'bodyL_tight_semiBold'
  | 'bodyL_paragraph_normal'
  | 'bodyL_paragraph_medium'
  | 'bodyL_paragraph_semiBold'
  | 'bodyM_tight_normal'
  | 'bodyM_tight_medium'
  | 'bodyM_tight_semiBold'
  | 'bodyM_paragraph_normal'
  | 'bodyM_paragraph_medium'
  | 'bodyM_paragraph_semiBold'
  | 'bodyS_tight_normal'
  | 'bodyS_tight_medium'
  | 'bodyS_tight_semiBold'
  | 'bodyS_paragraph_normal'
  | 'bodyS_paragraph_medium'
  | 'bodyS_paragraph_semiBold'

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * HTML тег для рендеринга компонента
   * @default 'p'
   */
  as?: React.ElementType
  /**
   * Вариант типографики из дизайн-системы
   * @default 'bodyM_paragraph_normal'
   */
  typography?: TypographyVariant
}

const StyledTypography = styled('p', {
  variants: {
    typography: {
      inherit: typographyStyles.inherit,
      displayXL: typographyStyles.displayXL,
      displayL: typographyStyles.displayL,
      displayM: typographyStyles.displayM,
      displayS: typographyStyles.displayS,
      headlineXL: typographyStyles.headlineXL,
      headlineL: typographyStyles.headlineL,
      headlineM: typographyStyles.headlineM,
      headlineS: typographyStyles.headlineS,
      headlineXS: typographyStyles.headlineXS,
      headlineXXS: typographyStyles.headlineXXS,
      bodyXL_tight_normal: typographyStyles.bodyXL_tight_normal,
      bodyXL_tight_medium: typographyStyles.bodyXL_tight_medium,
      bodyXL_tight_semiBold: typographyStyles.bodyXL_tight_semiBold,
      bodyXL_paragraph_normal: typographyStyles.bodyXL_paragraph_normal,
      bodyXL_paragraph_medium: typographyStyles.bodyXL_paragraph_medium,
      bodyXL_paragraph_semiBold: typographyStyles.bodyXL_paragraph_semiBold,
      bodyL_tight_normal: typographyStyles.bodyL_tight_normal,
      bodyL_tight_medium: typographyStyles.bodyL_tight_medium,
      bodyL_tight_semiBold: typographyStyles.bodyL_tight_semiBold,
      bodyL_paragraph_normal: typographyStyles.bodyL_paragraph_normal,
      bodyL_paragraph_medium: typographyStyles.bodyL_paragraph_medium,
      bodyL_paragraph_semiBold: typographyStyles.bodyL_paragraph_semiBold,
      bodyM_tight_normal: typographyStyles.bodyM_tight_normal,
      bodyM_tight_medium: typographyStyles.bodyM_tight_medium,
      bodyM_tight_semiBold: typographyStyles.bodyM_tight_semiBold,
      bodyM_paragraph_normal: typographyStyles.bodyM_paragraph_normal,
      bodyM_paragraph_medium: typographyStyles.bodyM_paragraph_medium,
      bodyM_paragraph_semiBold: typographyStyles.bodyM_paragraph_semiBold,
      bodyS_tight_normal: typographyStyles.bodyS_tight_normal,
      bodyS_tight_medium: typographyStyles.bodyS_tight_medium,
      bodyS_tight_semiBold: typographyStyles.bodyS_tight_semiBold,
      bodyS_paragraph_normal: typographyStyles.bodyS_paragraph_normal,
      bodyS_paragraph_medium: typographyStyles.bodyS_paragraph_medium,
      bodyS_paragraph_semiBold: typographyStyles.bodyS_paragraph_semiBold,
    },
  },
  defaultVariants: {
    typography: 'bodyM_paragraph_normal',
  },
})

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as = 'p', typography: typographyVariant, className, ...props }, ref) => {
    return (
      <StyledTypography
        as={as}
        ref={ref}
        typography={typographyVariant}
        className={className}
        {...props}
      />
    )
  }
)

Typography.displayName = 'Typography'
