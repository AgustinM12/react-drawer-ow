import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { OwScreen } from '../pages/Ow.page';
import { CharaInfoPage } from '../pages/CharaInfo.page';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName='Overwatch 2 Wiki'>
          <Drawer.Screen name="Overwatch 2 Wiki" component={OwScreen} />
          <Drawer.Screen
            name="Character Info"
            component={CharaInfoPage}
            options={{
              unmountOnBlur: true,
              drawerLabel: () => null,
              drawerItemStyle: { display: 'none' },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}
