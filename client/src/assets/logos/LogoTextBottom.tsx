import React, { SVGAttributes } from 'react'
import styled from 'styled-components'

interface ILogoProps extends SVGAttributes<Element> {
  fill?: string
  size?: number
}

const LogoTextBottom: React.FunctionComponent<ILogoProps> = ({ fill = '#000', size = 4, style, ...props }) => {
  style = {
    height: size + 'rem',
    width: size + 'rem',
    ...style,
  }

  return (
    <svg
      width={style.width}
      height={style.height}
      viewBox="0 0 66 92"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      {' '}
      <path
        fill="#fff"
        d="M35.912 7.702c13.818 0 25.02 11.237 25.02 25.098 0 13.862-11.202 25.098-25.02 25.098S10.892 46.662 10.892 32.8c0-.78.035-1.551.104-2.313.342.021.686.032 1.033.032 9.421 0 17.06-7.662 17.06-17.113 0-1.585-.216-3.12-.618-4.576 2.35-.733 4.85-1.128 7.44-1.128zm3.235 12.55l-4.408.019-7.925 21.424 3.443 3.029 11.409-5.364 1.87 5.134 3.905-1.416-8.294-22.827zm-4.157.697l.232.718-7.22 19.53-.589.273 7.577-20.52zm.483 1.397l.232.698-6.524 17.609-.575.266 6.867-18.573zm.464 1.396l.232.679-5.815 15.69-.605.279 6.188-16.648zm.484 1.377l.232.698-5.123 13.75-.58.268 5.47-14.716zm.527 1.287l3.289 9.03-8.106 3.852 4.817-12.882zM12.823 8.164v18.29H8.724V8.164h4.099zM7.917 6.692v18.29H3.818V6.692h4.099zm9.677-.848v18.29h-4.098V5.844h4.098zm4.772-3.236v18.29h-4.1V2.607h4.1zM2.177 91.671l.4-.867h3.265l.413.867h2.177L4.382 83h-.359L0 91.671h2.177zm2.976-2.335H3.21l.965-2.126h.027l.95 2.126zm6.383 2.335v-4.993l3.224 4.993h2.108V83.28h-2.012v4.979l-3.21-4.98H9.511v8.392h2.025zm8.588 0l.4-.867h3.265l.413.867h2.177L22.328 83h-.358l-4.023 8.671h2.177zm2.976-2.335h-1.943l.964-2.126h.028l.95 2.126zm9.979 2.335V89.91h-3.596v-6.63h-2.026v8.392h5.622zm4.04 0v-4.056l2.935-4.335h-2.273l-1.667 2.517-1.654-2.517h-2.287l2.935 4.335v4.056h2.012zm7.61 0v-6.573h1.874V83.28h-5.76v1.818h1.847v6.573h2.039zm5.033 0V83.28h-2.026v8.391h2.026zm6.08.28c1.53 0 2.673-.658 3.5-1.539l-1.35-1.342c-.58.573-1.324.937-2.15.937-1.474 0-2.425-1.119-2.425-2.532 0-1.412.95-2.531 2.425-2.531.826 0 1.57.364 2.15.937l1.39-1.343c-.881-.937-1.97-1.538-3.54-1.538-2.618 0-4.478 1.972-4.478 4.475 0 2.504 1.86 4.476 4.478 4.476zm7.361 0c1.557 0 2.797-1.23 2.797-2.713 0-1.315-.689-2.154-2.163-2.602-.703-.21-1.46-.321-1.46-.95 0-.546.427-.812.867-.812.565 0 .855.392.855.867H66C65.89 84.19 65.022 83 63.19 83c-1.558 0-2.811 1.23-2.811 2.713 0 1.44.771 2.098 2.163 2.602.675.237 1.488.42 1.488 1.048 0 .434-.317.728-.827.728-.468 0-.854-.392-.854-.881h-1.97c0 1.51 1.02 2.74 2.824 2.74zM7.019 78.671v-3.133l2.1 3.133h2.528l-2.225-3.119c1.222-.307 1.95-1.133 1.95-2.601 0-1.58-1.154-2.671-2.925-2.671H5v8.391h2.019zm1.62-4.755H7.02v-1.888h1.565c.453 0 .81.433.81.923 0 .49-.302.965-.755.965zm9.521 4.755V76.91h-3.584v-1.51h3.172v-1.79h-3.172v-1.511h3.433V70.28h-5.452v8.391h5.603zm2.902 0l.398-.867h3.254l.412.867h2.17L23.26 70h-.357l-4.01 8.671h2.17zm2.966-2.335H22.09l.962-2.126h.027l.948 2.126zm7.653 2.615c1.524 0 2.664-.658 3.488-1.539l-1.346-1.342c-.577.573-1.318.937-2.142.937-1.47 0-2.417-1.119-2.417-2.532 0-1.412.948-2.531 2.417-2.531.824 0 1.565.364 2.142.937l1.387-1.343C34.331 70.601 33.246 70 31.68 70c-2.608 0-4.462 1.972-4.462 4.475 0 2.504 1.854 4.476 4.463 4.476zm8.189-.28v-6.573h1.867V70.28h-5.74v1.818h1.84v6.573h2.033zm5.016 0V70.28h-2.019v8.391h2.019zm4.88.28l3.638-8.671h-2.1l-1.662 4.042-1.662-4.042h-2.101l3.639 8.67h.247zM60 78.67V76.91h-3.584v-1.51h3.172v-1.79h-3.172v-1.511h3.433V70.28h-5.452v8.391H60z"
      />
    </svg>
  )
}

export default styled(LogoTextBottom)`
  [fill] {
    fill: ${({ theme }) => theme.primary.corePrimary};
  }
`
