// A [HOC](https://reactjs.org/docs/higher-order-components.html) adding emitter to scenes. It gets array of emitter's name, listens to events and catches data and sends to sends result to the wrapped component by passing **emitterData** prop.<br />
// Also initializes all return parameter with this format:<br />
// ```
// {
//   successful:false,
//   error:false,
//   loading:false
// }
// ```
// **successful** for catching data. **error** for caching error. **loading** for showing data not received from server.<br />
// It's closes all event emitters in componentWillUnmount react lifecycle.<br />
import React, { Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { emitter } from '../../../configs/redux/Saga'

export default (events) => (WrappedComponent) => {
  class withEmitter extends Component {
        static WrappedComponent = WrappedComponent;

        static displayName = `withEmitter(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component'})`;
        componentDidMount () {
          events.map((event) => {
            this.emitterCallbackStack = { ...this.emitterCallbackStack, [event]: (args) => this.emitterCallback(event, args) }
            emitter.on(event, this.emitterCallbackStack[event])
          })
        }
        constructor (props) {
          super(props)
          const emitterData = {}
          events.map(event => {
            emitterData[event] = {
              loading: false,
              success: false,
              error: false
            }
          })
          this.state = { emitterData: emitterData }
          this.emitterCallbackStack = {}
        }
      emitterCallback = (event, args) => {
        this.setState(prevState => ({
          emitterData: { ...prevState.emitterData, [event]: args }

        }))
      }
      componentWillUnmount () {
        events.map((event) => {
          emitter.off(event, this.emitterCallbackStack[event])
        })
      }
      render () {
        return <WrappedComponent {...this.props} emitterData={this.state.emitterData} />
      }
  }

  return hoistNonReactStatics(withEmitter, WrappedComponent)
}
