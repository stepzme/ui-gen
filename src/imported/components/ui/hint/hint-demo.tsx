'use client'

import * as React from 'react'
import { Hint } from './hint'
import { Button } from '@/imported/components/ui/button'
import { Typography } from '@/imported/components/meta/typography'

export default function HintDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>Hint Component Demo</h1>

      <section>
        <h2>Базовый пример</h2>
        <Hint
          title="Семейная ипотека"
          text="Равным образом, социально-экономическое развитие не оставляет шанса для новых принципов формирования материально-технической и кадровой базы."
        >
          <Button>Показать подсказку</Button>
        </Hint>
      </section>

      <section>
        <h2>С действием</h2>
        <Hint
          title="Семейная ипотека"
          text="Равным образом, социально-экономическое развитие не оставляет шанса для новых принципов формирования материально-технической и кадровой базы."
          actionText="Подробнее"
          onClick={() => alert('Переход на подробности')}
        >
          <Button>Показать подсказку</Button>
        </Hint>
      </section>

      <section>
        <h2>Без заголовка</h2>
        <Hint text="Это простая подсказка без заголовка">
          <Button>Показать подсказку</Button>
        </Hint>
      </section>

      <section>
        <h2>Без иконки закрытия</h2>
        <Hint
          title="Подсказка"
          text="Эта подсказка не имеет иконки закрытия"
          closeIcon={false}
        >
          <Button>Показать подсказку</Button>
        </Hint>
      </section>

      <section>
        <h2>Разные размеры</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Hint
            title="Маленький"
            text="Текст подсказки"
            typography="bodyS"
          >
            <Button>bodyS</Button>
          </Hint>
          <Hint
            title="Средний"
            text="Текст подсказки"
            typography="bodyM"
          >
            <Button>bodyM</Button>
          </Hint>
          <Hint
            title="Большой"
            text="Текст подсказки"
            typography="bodyL"
          >
            <Button>bodyL</Button>
          </Hint>
        </div>
      </section>

      <section>
        <h2>Разные позиции</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Hint title="Сверху" text="Текст подсказки" placement="top">
            <Button>Top</Button>
          </Hint>
          <Hint title="Снизу" text="Текст подсказки" placement="bottom">
            <Button>Bottom</Button>
          </Hint>
          <Hint title="Слева" text="Текст подсказки" placement="left">
            <Button>Left</Button>
          </Hint>
          <Hint title="Справа" text="Текст подсказки" placement="right">
            <Button>Right</Button>
          </Hint>
        </div>
      </section>

      <section>
        <h2>В контексте текста</h2>
        <div style={{ maxWidth: '600px' }}>
          <Typography typography="bodyM_paragraph_normal">
            Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое.{' '}
            <Hint
              title="Подсказка"
              text="Это дополнительная информация о тексте"
              placement="top"
            >
              <span style={{ borderBottom: '1px dashed #666', cursor: 'help' }}>
                насекомое
              </span>
            </Hint>
            . Лежа на панцирнотвердой спине, он видел, стоило ему приподнять голову, свой коричневый, выпуклый, разделенный дугообразными чешуйками живот.
          </Typography>
        </div>
      </section>
    </div>
  )
}

