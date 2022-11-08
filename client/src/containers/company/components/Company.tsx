import React, { MouseEvent } from 'react'
import { DataCard, Subheading } from '../../../common/StyledComponents'
import { CompanyQuery_stock_company as CompanyDetails } from '../graphql/types/CompanyQuery'
import { CompanyCard, CompanyDescription, CompanyLink } from './Company.styles'
import { usePlatform } from '@/ra-platforms'

const URL = /(http(s)?:\/\/)?/

const Company: React.FunctionComponent<{ company: CompanyDetails }> = ({
  company: { description, name, symbol, website },
}) => {
  const platform = usePlatform()

  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    platform.openUrl(e.currentTarget.href)
  }

  return (
    <CompanyCard>
      <DataCard title="Company Summary" instrument={symbol}>
        <Subheading>
          {name} ({symbol})
        </Subheading>
        <CompanyLink target="_blank" href={website || ''} onClick={clickHandler}>
          {(website || '').replace(URL, '')}
        </CompanyLink>
        <CompanyDescription>{description}</CompanyDescription>
      </DataCard>
    </CompanyCard>
  )
}

export default Company
