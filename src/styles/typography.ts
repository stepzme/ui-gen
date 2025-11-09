/**
 * Типографические стили для использования в компонентах
 * Используются через spread в Stitches компонентах
 */

import { css } from '@/styles/stitches.config'

export const typography = {
  // Body S styles
  bodyS_tight_medium: css({
    fontSize: '$fontSizes.bodyS',
    lineHeight: '$lineHeights["body-s-tight"]',
    fontWeight: '$fontWeights.medium',
  }),

  bodyS_paragraph_medium: css({
    fontSize: '$fontSizes.bodyS',
    lineHeight: '$lineHeights["body-s-paragraph"]',
    fontWeight: '$fontWeights.medium',
  }),

  bodyS_tight_regular: css({
    fontSize: '$fontSizes.bodyS',
    lineHeight: '$lineHeights["body-s-tight"]',
    fontWeight: '$fontWeights.regular',
  }),

  bodyS_paragraph_regular: css({
    fontSize: '$fontSizes.bodyS',
    lineHeight: '$lineHeights["body-s-paragraph"]',
    fontWeight: '$fontWeights.regular',
  }),

  // Body M styles
  bodyM_tight_medium: css({
    fontSize: '$fontSizes.bodyM',
    lineHeight: '$lineHeights["body-m-tight"]',
    fontWeight: '$fontWeights.medium',
  }),

  bodyM_paragraph_medium: css({
    fontSize: '$fontSizes.bodyM',
    lineHeight: '$lineHeights["body-m-paragraph"]',
    fontWeight: '$fontWeights.medium',
  }),

  bodyM_tight_regular: css({
    fontSize: '$fontSizes.bodyM',
    lineHeight: '$lineHeights["body-m-tight"]',
    fontWeight: '$fontWeights.regular',
  }),

  bodyM_paragraph_regular: css({
    fontSize: '$fontSizes.bodyM',
    lineHeight: '$lineHeights["body-m-paragraph"]',
    fontWeight: '$fontWeights.regular',
  }),

  // Body L styles
  bodyL_tight_medium: css({
    fontSize: '$fontSizes.bodyL',
    lineHeight: '$lineHeights["body-l-tight"]',
    fontWeight: '$fontWeights.medium',
  }),

  bodyL_paragraph_medium: css({
    fontSize: '$fontSizes.bodyL',
    lineHeight: '$lineHeights["body-l-paragraph"]',
    fontWeight: '$fontWeights.medium',
  }),

  bodyL_tight_regular: css({
    fontSize: '$fontSizes.bodyL',
    lineHeight: '$lineHeights["body-l-tight"]',
    fontWeight: '$fontWeights.regular',
  }),

  bodyL_paragraph_regular: css({
    fontSize: '$fontSizes.bodyL',
    lineHeight: '$lineHeights["body-l-paragraph"]',
    fontWeight: '$fontWeights.regular',
  }),

  // Headline styles
  headlineS_tight_medium: css({
    fontSize: '$fontSizes.headlineS',
    lineHeight: '$lineHeights["headlines-headline-s"]',
    fontWeight: '$fontWeights.headline',
  }),

  headlineM_tight_medium: css({
    fontSize: '$fontSizes.headlineM',
    lineHeight: '$lineHeights["headlines-headline-m"]',
    fontWeight: '$fontWeights.headline',
  }),

  headlineL_tight_medium: css({
    fontSize: '$fontSizes.headlineL',
    lineHeight: '$lineHeights["headlines-headline-l"]',
    fontWeight: '$fontWeights.headline',
  }),

  // Display styles
  displayS_tight_medium: css({
    fontSize: '$fontSizes.displayS',
    lineHeight: '$lineHeights["displays-display-s"]',
    fontWeight: '$fontWeights.display',
  }),

  displayM_tight_medium: css({
    fontSize: '$fontSizes.displayM',
    lineHeight: '$lineHeights["displays-display-m"]',
    fontWeight: '$fontWeights.display',
  }),

  displayL_tight_medium: css({
    fontSize: '$fontSizes.displayL',
    lineHeight: '$lineHeights["displays-display-l"]',
    fontWeight: '$fontWeights.display',
  }),
}

