import { SVGPropType } from "@/app/types/components/SVGTypes"

const LightModeSVG = ({ width, height, fill}: SVGPropType) => (
  <svg
    viewBox="0 0 16 16"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <circle cx={8.5} cy={7.5} r={4.5} />
    <path fill={fill} d="M8 0h1v2H8zM8 13h1v2H8zM14 7h2v1h-2zM1 7h2v1H1zM12.035 11.743l.707-.707 1.414 1.414-.707.707zM2.843 2.55l.707-.707 1.415 1.414-.707.707zM2.843 12.45l1.414-1.415.707.707-1.414 1.415zM12.035 3.257l1.414-1.414.708.707-1.415 1.415z" />
  </svg>
)

export default LightModeSVG