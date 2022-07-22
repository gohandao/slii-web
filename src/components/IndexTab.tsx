import React, { useContext } from 'react'

import { UtilitiesContext } from '@/contexts/UtilitiesContext'

type Tab = {
  tabId: 'all' | 'op' | 'ed' | undefined
  tabName: string
}

export const IndexTab = () => {
  const { indexTab, setIndexTab } = useContext(UtilitiesContext)
  const onClickHandler = (tabId: 'all' | 'op' | 'ed' | undefined) => {
    setIndexTab(tabId)
  }
  const Tab = ({ tabId, tabName }: Tab) => {
    let passiveClass = ''
    if (tabId != indexTab) {
      passiveClass = 'opacity-20'
    }
    return (
      <button
        className={`text-3xl font-bold ${passiveClass}`}
        onClick={() => onClickHandler(tabId)}
      >
        {tabName}
      </button>
    )
  }

  return (
    <div className="flex gap-5">
      <Tab tabId="all" tabName="ALL" />
      <Tab tabId="op" tabName="OP" />
      <Tab tabId="ed" tabName="ED" />
    </div>
  )
}
