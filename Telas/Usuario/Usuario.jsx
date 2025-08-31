import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { initDB, addUsuario, getUsuario, deletarUsuario, alterarUsuario, consultaUsuario } from '../../bd/db';
import Estilos from '../../Componentes/Estilos';
import TextoInput from '../../Componentes/TextoInput';
import md5 from "md5";

export default function Usuario(props) {

    const [usuarios, setUsuarios] = useState([]);
    const [dadosNome, setDadosNome] = useState('');
    const [dadosCpf, setDadosCpf] = useState('');
    const [dadosRg, setDadosRg] = useState('');
    const [dadosDataNascimento, setDadosDataNascimento] = useState('');
    const [dadosSenha, setDadosSenha] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        (async () => {
            await initDB();
            carregarUsuarios();
        })();
    }, []);

    const carregarUsuarios = async () => {
        const results = await consultaUsuario();
        setUsuarios(results);
    }

    const salvar = async () => {
        if (dadosNome.length <= 0) {
            Alert.alert('Digite um nome')
        } else if (dadosCpf.length <= 0) {
            Alert.alert('Digite um cpf')
        } else if (dadosRg.length <= 0) {
            Alert.alert('Digite um rg')
        } else if(dadosDataNascimento.length <= 0){
            Alert.alert('Digite uma data de nascimento')
        }else if (dadosSenha.length <= 0) {
            Alert.alert('Digite uma senha')
        } else {
            if (editingId !== null) {
                await alterarUsuario(editingId, dadosNome, dadosCpf, dadosRg, dadosDataNascimento, md5(dadosSenha));
                setEditingId(null);
            } else {
                await addUsuario(dadosNome, dadosCpf, dadosRg, dadosDataNascimento, md5(dadosSenha));
            }
            setDadosNome('');
            setDadosCpf('');
            setDadosRg('');
            setDadosDataNascimento('');
            setDadosSenha('');
            carregarUsuarios();
        }
    }

    const editar = (item) => {
            setDadosNome(item.nome);
            setDadosCpf(item.cpf);
            setDadosRg(item.rg);
            setDadosDataNascimento(item.datanascimento);
            setDadosSenha(item.senha);
            setEditingId(item.id);
    }

    const deletar = async (id) =>{
            await deletarUsuario(id);
            carregarUsuarios();
    }

    const renderUsuario = ({ item }) => (
        <View style={styles.containercard}>
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.cardcoluna}>
                        <View style={styles.cardlinha}>
                            <Text style={styles.name}>Nome: {item.nome}</Text>
                            <Text style={styles.name}>Cpf: {item.cpf}</Text>
                            <Text style={styles.name}>Rg: {item.rg}</Text>
                            <Text style={styles.name}>Data nascimento: {item.datanascimento}</Text>
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

                <Text style={styles.header}> {editingId !== null ? 'Editar Usuário' : 'Cadastro de usuário'} </Text>

                <TextoInput estilo={Estilos.input}
                                placeholder="Digite seu nome"
                                maxLength={50}
                                value={dadosNome}
                                setvalue={setDadosNome}
                                label='Nome'/>

                <TextoInput estilo={Estilos.input}
                                placeholder="Digite um cpf"
                                maxLength={11}
                                value={dadosCpf}
                                setvalue={setDadosCpf}
                                label='Cpf'
                />

                <TextoInput estilo={Estilos.input}
                                placeholder="Digite um rg"
                                maxLength={7}
                                value={dadosRg}
                                setvalue={setDadosRg}
                                label='Rg'
                />

                <TextoInput estilo={Estilos.input}
                                placeholder="Digite sua data de nascimento"
                                maxLength={8}
                                value={dadosDataNascimento}
                                setvalue={setDadosDataNascimento}
                                label='Data Nascimento'
                />

                <TextoInput estilo={Estilos.input}
                                placeholder="Digite sua senha"
                                maxLength={12}
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
                    data={usuarios}
                    style={styles.contentList}
                    keyExtractor={(usuario) => usuario.id.toString()}
                    renderItem={renderUsuario}
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
  }
});