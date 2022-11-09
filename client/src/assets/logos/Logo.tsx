import React, { SVGAttributes } from 'react'
import styled from 'styled-components'

interface ILogoProps extends SVGAttributes<Element> {
  fill?: string
  size?: number
}

const Logo: React.FunctionComponent<ILogoProps> = ({ fill = '#000', size = 4, style, ...props }) => {
  style = {
    height: size + 'rem',
    width: size + 'rem',
    ...style,
  }

  return (
    <svg
      width={style.width}
      height={style.height}
      viewBox="0 0 59 59"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      {' '}
      <path
        fill="#FFF"
        fill-rule="evenodd"
        d="M32.8 7.45C46.165 7.45 57 18.318 57 31.725 57 45.132 46.165 56 32.8 56 19.435 56 8.6 45.132 8.6 31.725c0-.754.034-1.5.101-2.237.331.02.664.03.999.03 9.113 0 16.5-7.41 16.5-16.551 0-1.533-.208-3.017-.596-4.426 2.273-.71 4.69-1.091 7.196-1.091zm3.129 12.137l-4.264.02L24 40.326l3.33 2.93 11.035-5.188 1.809 4.966 3.777-1.37-8.022-22.078zm-4.02.675l.224.695-6.984 18.89-.569.263 7.328-19.848zm.467 1.351l.224.675-6.31 17.032-.557.257 6.643-17.964zm.449 1.35l.224.657-5.624 15.175-.586.27 5.986-16.101zm.467 1.333l.224.675-4.954 13.298-.562.26 5.292-14.233zm.51 1.244l3.181 8.733L29.143 38l4.66-12.46zM9.477 7.661v15.242H6.06V7.66h3.416zM5.387 6.434v15.242H1.972V6.434h3.415zm8.065-.706V20.97h-3.416V5.728h3.416zm3.976-2.697v15.241h-3.416V3.031h3.416z"
      />
    </svg>
  )
}

export default styled(Logo)`
  [fill] {
    fill: ${({ theme }) => theme.primary.corePrimary};
  }
`
