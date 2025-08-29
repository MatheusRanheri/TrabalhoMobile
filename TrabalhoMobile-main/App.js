import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Usuario from './Telas/Usuario/Usuario';
import CriarUsuario from './Telas/CriarUsuario/CriarUsuario';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Usuário' component={Usuario}/>
        <Stack.Screen name='Criar Usuário' component={CriarUsuario}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
