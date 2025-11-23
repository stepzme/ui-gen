'use client'

import * as React from 'react'
import { Pagination } from './pagination'

export function PaginationDemo() {
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Pagination - Базовый пример</h2>
        <Pagination
          totalElements={100}
          itemsPerPage={10}
          onChange={(pageIndex, pageSize) => {
            setPage(pageIndex)
            setPageSize(pageSize)
            console.log('Page:', pageIndex, 'PageSize:', pageSize)
          }}
        />
        <div>Текущая страница: {page + 1}, Размер страницы: {pageSize}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Pagination - С селектом и инпутом</h2>
        <Pagination
          totalElements={100}
          itemsPerPage={10}
          showSelect={true}
          showInput={true}
          leftSelectText="Показать"
          rightSelectText="записей из"
          leftInputText="Перейти на страницу"
          rightInputText="из 10"
          onChange={(pageIndex, pageSize) => {
            setPage(pageIndex)
            setPageSize(pageSize)
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Pagination - Simple режим</h2>
        <Pagination
          totalElements={100}
          itemsPerPage={10}
          mode="simple"
          hideItems={true}
          rightSelectText="записей из"
          onChange={(pageIndex, pageSize) => {
            setPage(pageIndex)
            setPageSize(pageSize)
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Pagination - Без элементов пагинации</h2>
        <Pagination
          totalElements={100}
          itemsPerPage={10}
          hideItems={true}
          onChange={(pageIndex, pageSize) => {
            setPage(pageIndex)
            setPageSize(pageSize)
          }}
        />
      </div>
    </div>
  )
}

