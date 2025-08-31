import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Telas/Home';
import Usuario from './Telas/Usuario/Usuario';
import Medico from './Telas/Medico/Medico';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Usuário' component={Usuario}/>
        <Stack.Screen name='Médico' component={Medico}/>
        <Stack.Screen name='Home' component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
