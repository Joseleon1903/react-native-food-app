import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { COLORS } from '../constants/theme';

const MenuRoute= () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const DirectionRoute= () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const MainRoute= () => (
  <View style={{ flex: 1, backgroundColor: COLORS.gray }} />
);


const renderScene = SceneMap({
  first: MenuRoute,
  second: DirectionRoute,
  three: MainRoute
});

export default function RestaurantPages() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Menu' },
    { key: 'second', title: 'Direction'},
    { key: 'three', title: 'New'},
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}