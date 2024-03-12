import Keyboard from "./Keyboard"
import InputMapper from "./InputMapper"
import Throttle from "../Throttle"
import { CommandCreator, CommandCreatorMap, DisppatchCallback, SequenceMap, VectorMap } from "../types"
import DirectionalMapper from "./DirectionalMapper"
import SequenceMatcher from "./SequenceMatcher"

type InputMapperFactoryDependencies = {
  Keyboard: Keyboard,
  Throttle: Throttle,
}

class InputMapperFactory {
  private keyboard: Keyboard
  private throttle: Throttle

  constructor({ Keyboard, Throttle }: InputMapperFactoryDependencies) {
    this.keyboard = Keyboard
    this.throttle = Throttle
  }

  makeInputMapper(commandCreatorMap: CommandCreatorMap = {}, throttleTime: number = 200, dispatchCallback: DisppatchCallback) {
    return new InputMapper(
      commandCreatorMap,
      this.keyboard,
      this.throttle,
      throttleTime,
      dispatchCallback
    )
  }

  makeDirectionalMapper(vectorMap: VectorMap = {}, throttleTime: number = 200, commandCreator: CommandCreator, dispatchCallback: DisppatchCallback) {
    return new DirectionalMapper(vectorMap, this.keyboard, this.throttle, throttleTime, commandCreator, dispatchCallback)
  }

  makeSequenceMatcher(sequenceMap: SequenceMap = {}, commandCreator: CommandCreator, dispatchCallback: DisppatchCallback) {
    return new SequenceMatcher(sequenceMap, commandCreator, dispatchCallback)
  }
}

export default InputMapperFactory
