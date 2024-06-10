import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import MenuTab from '../screens/restaurants/MenuTab';
import DirectionTab from '../screens/restaurants/DirectionTab';
import NewsTab from '../screens/restaurants/NewsTab';

const renderScene = SceneMap({
  first: MenuTab,
  second: DirectionTab,
  three: NewsTab
});

export default function RestaurantPages() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Menu' },
    { key: 'second', title: 'Direction'},
    { key: 'three', title: 'News/Sale'},
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