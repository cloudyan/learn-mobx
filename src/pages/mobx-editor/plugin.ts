import { TopPanel, ComponentsPanel, CanvasPanel, SettersPanel } from './components'
import { skeleton, config } from './core'

skeleton.add({
  area: 'leftArea',
  type: 'panel',
  name: 'ComponentsPanel',
  content: ComponentsPanel,
  contentProps: {title: 'components test'},
  props: {},
})

skeleton.add({
  area: 'topArea',
  type: 'panel',
  name: 'TopPanel',
  content: TopPanel,
  contentProps: {title: 'top test', config},
  props: {},
})

skeleton.add({
  area: 'mainArea',
  type: 'panel',
  name: 'CanvasPanel',
  content: CanvasPanel,
  contentProps: {title: 'canvas test'},
  props: {},
})

skeleton.add({
  area: 'rightArea',
  type: 'panel',
  name: 'SettersPanel',
  content: SettersPanel,
  contentProps: {title: 'setters test'},
  props: {},
})
