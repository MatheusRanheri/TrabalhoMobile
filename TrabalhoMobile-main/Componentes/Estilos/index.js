import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        margin: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#154360',
        width: 130,
        height: 60,
        borderRadius: 20,
    },
    buttonHome: {
        backgroundColor: '#154360',
        width: '90%',
        margin: 10,
        height: 60,
        borderRadius: 20
    },
    input: {
        width: '90%',
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#081534',
        fontSize: 15,
        borderRadius: 10
    },
    buttonTexto: {
        fontFamily: 'Arial',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 15,
        color: '#FFFFFF',
    },
    texto_pequeno: {
        fontSize: 10
    },
    texto_titulo: {
        fontSize: 30,
        color: '#154360',
        textAlign: 'center',
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20
    },
    card_dados: {
        marginLeft: 20,
        marginRight: 20,
        width: '90%',
        backgroundColor: 'white',
        padding: 10,
        height: 330
    },
});

export default styles;