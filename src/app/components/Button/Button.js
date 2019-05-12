import React from 'react'
import PropTypes from 'prop-types'
import { Button as SemanticButton } from 'semantic-ui-react'

const Button = (props) => {
  return <SemanticButton {...props} />
}
Button.propTypes = {
  as: PropTypes.any,
  active: PropTypes.bool,
  animated: PropTypes.oneOfType(PropTypes.bool, PropTypes.string),
  attached: PropTypes.oneOfType(PropTypes.bool, PropTypes.string),
  basic: PropTypes.bool,
  children: PropTypes.element,
  circular: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  compact: PropTypes.bool,
  content: PropTypes.any,
  disabled: PropTypes.bool,
  floated: PropTypes.string,
  fluid: PropTypes.bool,
  icon: PropTypes.any,
  inverted: PropTypes.bool,
  label: PropTypes.any,
  labelPosition: PropTypes.oneOf(['right', 'left']),
  loading: PropTypes.bool,
  negative: PropTypes.bool,
  onClick: PropTypes.func,
  positive: PropTypes.bool,
  primary: PropTypes.bool,
  role: PropTypes.string,
  secondary: PropTypes.bool,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive']),
  tabIndex: PropTypes.oneOfType(PropTypes.bool, PropTypes.number),
  toggle: PropTypes.bool

}
export default Button
