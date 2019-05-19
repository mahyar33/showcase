import React, { Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { emitter } from '../../../configs/redux/SagaChannel'

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
