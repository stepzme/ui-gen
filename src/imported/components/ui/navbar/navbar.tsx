import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { ButtonIcon } from '@/imported/components/ui/buttonIcon'
import { ButtonText } from '@/imported/components/ui/buttonText'
import { Progress } from '@/imported/components/ui/progress'
import { Icon } from '@/imported/components/ui/icon'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Компонент слева. Если не указан, будет шеврон. Если false, то будет пусто
   */
  left?: React.ReactNode | false
  /**
   * Обработчик клика на шеврон или текст левой части
   */
  onBackClick?: () => void
  /**
   * Обработчик клика на правый текст (не работает если typeof right !== "string")
   */
  onRightClick?: () => void
  /**
   * Заголовок
   */
  title?: string
  /**
   * Подзаголовок
   */
  subtitle?: string
  /**
   * Значение прогресса от 0 до 100
   */
  progress?: number
  /**
   * Компонент справа. Если текст, то будет обёрнут в ButtonText
   */
  right?: React.ReactNode
  /**
   * Зафиксировать компонент сверху
   */
  fixed?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const NavbarContainer = styled(Container, {
  boxSizing: 'border-box',
  display: 'flex',
  padding: '$x2',
  width: '100%',
  gap: '$x3',
  alignItems: 'center',

  variants: {
    hasProgress: {
      true: {
        [`& ${Container}`]: {
          flex: 1,
        },
      },
    },
    fixed: {
      true: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      },
    },
  },
})

const NavbarLeft = styled(Container, {
  display: 'flex',
  alignItems: 'center',
})

const NavbarRight = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

const NavbarCenter = styled(Container, {
  display: 'flex',
  gap: '$x1',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flex: 1,
})

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      left,
      onBackClick,
      onRightClick,
      title,
      subtitle,
      progress,
      right,
      fixed,
      css,
      ...props
    },
    ref
  ) => {
    const renderLeft = () => {
      if (left === false) {
        return null
      }

      if (left === undefined) {
        return (
          <ButtonIcon
            onClick={onBackClick}
            aria-label="Назад"
            css={{ width: 36, height: 36 }}
          >
            <Icon
              variant="arrow_left"
              css={{
                fontSize: 20,
                '& svg': { fill: 'var(--semantic-brand-primary)' },
              }}
            />
          </ButtonIcon>
        )
      }

      if (typeof left === 'string') {
        return (
          <ButtonText onClick={onBackClick} aria-label="Назад">
            {left}
          </ButtonText>
        )
      }

      return left
    }

    const renderRight = () => {
      if (!right) {
        return null
      }

      if (typeof right === 'string') {
        return <ButtonText onClick={onRightClick}>{right}</ButtonText>
      }

      if (React.isValidElement(right)) {
        return right
      }

      return null
    }

    return (
      <NavbarContainer
        as="nav"
        hasProgress={progress !== undefined}
        fixed={fixed}
        css={{
          ...(progress !== undefined && !title && {
            paddingTop: 0,
            paddingBottom: 0,
          }),
          ...css,
        }}
        ref={ref as React.Ref<HTMLDivElement>}
        {...props}
      >
        <NavbarLeft>{renderLeft()}</NavbarLeft>
        <NavbarCenter
          css={{
            ...(progress !== undefined && !title && { gap: '$x2' }),
          }}
        >
          {title && (
            <Typography typography="bodyM_tight_normal">{title}</Typography>
          )}
          {subtitle && (
            <Typography
              typography="bodyS_tight_normal"
              css={{ color: 'var(--semantic-text-secondary)' }}
            >
              {subtitle}
            </Typography>
          )}
          {progress !== undefined && (
            <Progress value={progress} css={{ width: '100%' }} />
          )}
        </NavbarCenter>
        <NavbarRight>{renderRight()}</NavbarRight>
      </NavbarContainer>
    )
  }
)

Navbar.displayName = 'Navbar'

