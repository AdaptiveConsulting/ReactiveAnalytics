import Downshift, { GetItemPropsOptions } from 'downshift'
import React from 'react'
import { search_symbols as SearchResult } from '../../../__generated__/types'
import styled from 'styled-components/macro'
interface ISearchBarProps {
  items: SearchResult[]
  initialItem: SearchResult | null
  maxItems?: number
  onChange: (symbol: SearchResult | null) => void
  onTextChange: (text: string) => void
  placeholder: string
}

class SearchInput extends React.Component<ISearchBarProps, {}> {
  public searchResultToOptionString = (item: SearchResult | null): string => (item ? `${item.id} - ${item.name}` : '')

  public render() {
    return (
      <Downshift
        selectedItem={this.props.initialItem}
        onChange={this.props.onChange}
        itemToString={this.searchResultToOptionString}
        defaultHighlightedIndex={0}
      >
        {({ getInputProps, getItemProps, getMenuProps, getRootProps, isOpen, inputValue }) => {
          this.props.onTextChange(inputValue || '')
          return (
            <SearchWrapper {...getRootProps()}>
              <input
                {...getInputProps({ placeholder: this.props.placeholder })}
                style={{ width: '100%' }}
                autoFocus={true}
                spellCheck={false}
              />
              {isOpen ? <SearchResults {...getMenuProps()}>{this.renderItems(getItemProps)}</SearchResults> : null}
            </SearchWrapper>
          )
        }}
      </Downshift>
    )
  }

  private renderItems(getItemProps: (options: GetItemPropsOptions<SearchResult>) => any) {
    const { items, maxItems } = this.props
    if (items.length === 0) {
      return <SearchResultNoItem>No results found...</SearchResultNoItem>
    }
    let sliceTo = (maxItems || items.length) + 1
    return items.slice(0, sliceTo).map((item, index) => (
      <SearchResultItem key={item.id} {...getItemProps({ index, item })}>
        {item.marketSegment && (
          <>
            <small>{item.marketSegment}</small>
            <small>/</small>
          </>
        )}
        {item.id.toUpperCase()} - {item.name}
      </SearchResultItem>
    ))
  }
}

const SearchWrapper = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr auto;
  position: relative;
  & svg {
    color: ${({ theme }) => theme.primary.corePrimary};
  }
  > input {
    color: ${({ theme }) => theme.textColor};
  }
`

const SearchResults = styled.menu`
  position: absolute;
  background: ${({ theme }) => theme.primary.corePrimary};
  z-index: 1000;
  border: solid 1px ${({ theme }) => theme.secondary.coreSecondary};
  border-radius: 5px;
  margin-top: 5px;
  top: 2.25rem;
  left: 0;
  right: 0;
  cursor: pointer;
`
const SearchResultItemBase = styled.div`
  padding: 5px;
`

const SearchResultNoItem = styled(SearchResultItemBase)`
  opacity: 0.59;
`

const SearchResultItem = styled(SearchResultItemBase)`
  padding: 5px;
  > small {
    display: inline-block;
    font-size: 0.5em;
    padding-right: 5px;
  }
  &[aria-selected='true'] {
    color: ${({ theme }) => theme.primary.corePrimary};
    background: ${({ theme }) => theme.secondary.coreSecondary};
  }
`

export default SearchInput
