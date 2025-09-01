import { Text, View, TouchableOpacity, Image } from "react-native";
import Estilos from '../../Componentes/Estilos';

export default function Home(props){

    const abrirLoginMedico = () =>{
        props.navigation.navigate('Médico');    
    }

    const abrirLoginUsuario = () => {
        props.navigation.navigate('Usuário');
    }

    return(
        <View style={Estilos.container}>
            <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={abrirLoginUsuario}>
                <Text style={Estilos.buttonTexto}>Login usuário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={abrirLoginMedico}>
                <Text style={Estilos.buttonTexto}>Login Médico</Text>
            </TouchableOpacity>
        </View>
    )

}