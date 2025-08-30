import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { initDB, addUsuario, getUsuario, deletarUsuario, alterarUsuario, consultaUsuario, consultarMedico, alterarMedico, addMedico, deletarMedico } from '../../bd/db';
import Estilos from '../../Componentes/Estilos';
import TextoInput from '../../Componentes/TextoInput';
import md5 from "md5";

export default function Medico(props){

    const [medicos, setMedicos] = useState([]);
    const [dadosNome, setDadosNome] = useState('');
    const [dadosEspecialidade, setDadosEspecialidade] = useState('');
    const [dadosCrm, setDadosCrm] = useState('');
    const [dadosFoto, setDadosFoto] = useState('');
    const [dadosSenha, setDadosSenha] = useState('');
    const [editingId, setEditingId] = useState(null);

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

    const salvar = async () => {
        if(dadosNome.length <= 0){
            Alert.alert('Digite um nome');
        }else if(dadosEspecialidade <= 0){
            Alert.alert('Escolha uma especialidade');
        }else if(dadosCrm <= 0){
            Alert.alert('Digite um crm');
        }else if(dadosFoto <= 0){
            Alert.alert('Tire uma foto');
        }else if(dadosEspecialidade <= 0){
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
            setDadosFoto(''),
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

    
}