import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert, Button, Image } from "react-native";
import { initDB, consultarMedico, alterarMedico, addMedico, deletarMedico } from '../../bd/db';
import Estilos from '../../Componentes/Estilos';
import TextoInput from '../../Componentes/TextoInput';
import md5 from "md5";
import { Picker } from "@react-native-picker/picker";
import { CameraView, useCameraPermissions, } from "expo-camera";

export default function Medico(props){

    const [medicos, setMedicos] = useState([]);
    const [dadosNome, setDadosNome] = useState('');
    const [dadosEspecialidade, setDadosEspecialidade] = useState('');
    const [dadosCrm, setDadosCrm] = useState('');
    const [dadosFoto, setDadosFoto] = useState(null);
    const [dadosSenha, setDadosSenha] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
        (async () => {
            await initDB();
            carregarMedicos();
        })();
    }, []);

    const carregarMedicos = async() =>{
        const results = await consultarMedico();
        setMedicos(results);
    };

    if(!permission){
        return <View />
    }

    if(!permission.granted){
        return(
            <View style={styles.container}>
                <Text style={styles.texto}>Nós precisamos da permissão para utilizar a câmera</Text>
                <Button onPress={requestPermission} title="Solicitar permissão câmera"/>
            </View>
        );
    }

    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

    const handleClick = async() => {
        if(cameraRef.current){
            const newFoto = await cameraRef.current.takePictureAsync();
            setDadosFoto(newFoto.uri);
        }
    }

    const salvar = async () => {
        if(dadosNome.length <= 0){
            Alert.alert('Digite um nome');
        }else if(dadosEspecialidade <= 0){
            Alert.alert('Escolha uma especialidade');
        }else if(dadosCrm <= 0){
            Alert.alert('Digite um crm');
        }else if(dadosFoto <= 0){
            Alert.alert('Tire uma foto');
        }else if(dadosSenha <= 0){
            Alert.alert('Digite uma senha');
        }else{
            if(editingId !== null){
                alterarMedico(editingId, dadosNome, dadosEspecialidade, dadosCrm, dadosFoto, md5(dadosSenha));
                setEditingId(null)
            }else{
                addMedico(dadosNome, dadosEspecialidade, dadosCrm, dadosFoto, md5(dadosSenha));
            }
            setDadosNome('');
            setDadosEspecialidade('');
            setDadosCrm('');
            setDadosFoto('');
            setDadosSenha('');
            carregarMedicos();
        }
    }

    const editar = (item) => {
        setDadosNome(item.nome);
        setDadosEspecialidade(item.especialidade);
        setDadosCrm(item.crm);
        setDadosFoto(item.foto);
        setDadosSenha(item.senha);
        setEditingId(item.id);
    }

    const deletar = async (id) => {
        await deletarMedico(id);
        carregarMedicos();
    }

    const renderMedico = ({ item }) => (
        <View style={styles.containercard}>
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.cardcoluna}>
                        <View style={styles.cardlinha}>
                            <Image style={{width: 100, height: 100, borderRadius: 10}} source={{uri: item.foto}}/>
                            <Text style={styles.name}>Nome: {item.nome}</Text>
                            <Text style={styles.name}>Especialidade: {item.especialidade}</Text>
                            <Text style={styles.name}>Crm: {item.crm}</Text>
                            <View style={styles.botoesacoes}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => editar(item)}>
                                    <Text style={styles.buttontexto}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => {deletar(item.id)}}>
                                    <Text style={styles.buttontexto}>Deletar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return(
        <View style={styles.container}>

            <View style={Estilos.card_dados}>
                <Text style={styles.header}> {editingId !== null ? 'Editar Médico' : 'Cadastro de Médicos'} </Text>

                <TextoInput estilo={Estilos.input}
                                placeholder='Digite seu nome'
                                maxLenght={30}
                                value={dadosNome}
                                setvalue={setDadosNome}
                                label='Nome'
                />

                <View style={{marginVertical: 10, marginHorizontal: 20, }}>
                    <Text style={{fontSize: 14, marginBottom: 4}}>Selecione uma especialidade</Text>
                    <Picker style={{height: 50, borderWidth: 1, backgroundColor: '#154360', borderRadius: 10, color: 'white'}} selectedValue={dadosEspecialidade} onValueChange={(itemValue, itemIndex) => setDadosEspecialidade(itemValue)}>
                    <Picker.Item label="Nehuma" value=""/>
                    <Picker.Item label="Cardiologia" value="Cardiologia"/>
                    <Picker.Item label="Neurologia" value="Neurologia"/>
                    <Picker.Item label="Pediatria" value="Pediatria"/>
                    <Picker.Item label="Psiquiatria" value="Psiquiatria"/>
                    </Picker>
                </View>

                <TextoInput estilo={Estilos.input}
                                placeholder='Digite seu crm'
                                maxLenght={30}
                                value={dadosCrm}
                                setvalue={setDadosCrm}
                                label='Crm'
                />
                
                    <View style={{marginBottom: 10}}>
                            <Text style={styles.textoCamera}>Foto</Text>
                    

                        <View style={{width: 300, height: 100, backgroundColor: "grey", borderRadius: 10, overflow: "hidden"}}>
                            <CameraView style={{flex: 1}}
                                ref={cameraRef}
                                facing={facing}>

                                <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", padding: 10}}>
                                    <TouchableOpacity style={{padding: 8, borderRadius: 8, alignContent: 'flex-end'}} onPress={toggleCameraFacing}>
                                        <Text style={{color: "white"}}>Virar Câmera</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ padding: 12, borderRadius: 30, alignContent: 'flex-end'}} onPress={handleClick}>
                                        <Text style={{color: 'white'}}>Tirar Foto</Text>
                                    </TouchableOpacity>
                                </View>
                            </CameraView>
                        </View>
                    </View>


                <TextoInput estilo={Estilos.input}
                                placeholder='Digite sua senha'
                                maxLenght={30}
                                value={dadosSenha}
                                setvalue={setDadosSenha}
                                label='Senha'
                                password={true}
                />

                    <TouchableOpacity style={styles.buttonsalvar} activeOpacity={0.7} onPress={salvar}>
                            <Text style={styles.buttontexto}>Salvar</Text>
                    </TouchableOpacity>
            </View>

            <FlatList
                data={medicos}
                style={styles.contentList}
                keyExtractor={(medico) => medico.id.toString()}
                renderItem={renderMedico}
                ListEmptyComponent={() => (
                <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>Nenhum item cadastrado.</Text>
                </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#154360',
  },
  cameraEstilo:{
    flex: 1, 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0 
  },
  cameraImage:{
    width: 100, 
    height: 100, 
    borderRadius: 10
  },
  cameraBotao:{
    width: 100, 
    height: 100, 
    borderRadius: 10, 
    backgroundColor: 'grey', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 10
  },
  container: {
        flex: 1,
        backgroundColor: '#ebf0f7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
  },
  buttonsalvar: {
        backgroundColor: '#154360',
        width: 100,
        height: 30,
        marginTop: 10,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
  },
  button: {
        backgroundColor: '#154360',
        width: 100,
        height: 30,
        marginTop: 5,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 5
  },
  buttontexto: {
    fontSize: 16,
    color: '#ffffff'
  },
  contentList: {
    flex: 1,
    width: '100%'
  },
  containercard: {
    felx: 1,
    width: '90%'
  },
  cardcoluna: {
    flexDirection: 'row'
  },
  cardlinha: {
    flexDirection: 'column'
  },
  botoesacoes: {
    flexDirection: 'row',
    margin: 10
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 15,
    width: '100%'
  },
  texto: {
    fontSize: 18,
    alignSelf: 'center',
  },
  textobold: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 18,
    color: 'gray',
  },
  textoCamera:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  camera:{
    flex: 1
  },
  buttonCamera:{
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  }

});