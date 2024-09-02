import React, { useState, useCallback, useEffect } from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import ListaTarefas from './src/componentes/ListaTarefas';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BtnAnimado = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App(){

const [lista, setLista]= useState([]);
const [BtnOpen, setBtnOpen] = useState(false);
const [input, setInput] = useState('');

//Buscando todas tarefas ao iniciar App
useEffect(() => {
  const carregarLista = async() =>{
    const listaStorage = await AsyncStorage.getItem('@lista');

    if (listaStorage !== null){
      setLista(JSON.parse(listaStorage));
    }
  }
  carregarLista();
}, []);


/*Salvando lista tarefas caso tenho alguma alteração*/
useEffect(() => {
  const salvarLista = async () => {
     await AsyncStorage.setItem('@lista', JSON.stringify(lista));
  }
  salvarLista();
});


function cadastrarTarefa(){
  if(input !==''){
    const dados = {
    key: input,
    lista: input
    };

  setLista([...lista, dados]);
  setBtnOpen(false);
  setInput('');
}else
  alert('Digite uma tarefa criatura!');
}


const deletarTarefa = useCallback((tarefa) => {
  const filtro = lista.filter(resultado => resultado.key !== tarefa.key); // retorna todos itens diferentes do clicado
  setLista(filtro);
})

  return(
    <SafeAreaView style={stilos.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content"/>
    
    <View style={stilos.content}>
    <Text style={stilos.titulo}>Lista de Compras e Tarefas</Text>
    </View>

    <FlatList
    marginHorizontal={10}
    showsHorizontalScrollIndicator={false} //desabiliar barra rolagem
    data={lista}
    keyExtractor={ (item) => String(item.key)}
    renderItem={ ({item} ) => <ListaTarefas tarefa={item} deleteItem={deletarTarefa} /> }
    />

    <Modal animationType='slide' transparent={false} visible={BtnOpen}>
      <SafeAreaView style={stilos.modal}>

        <View style={stilos.modalHeader}>
          <TouchableOpacity onPress={ () => setBtnOpen(false) }>
            <Ionicons name="arrow-back" size={30} color={"#FFF"}/>
          </TouchableOpacity>
          <Text style={stilos.modalTitulo}>Nova Tarefa</Text>
        </View>

        <Animatable.View style={stilos.modalCorpo} animation={"fadeInUp"} useNativeDriver>
          <TextInput style={stilos.input}
          multiline={true}
          placeholderTextColor={"#747474"}
          autoCorrect={false}
          placeholder="Do que não posso esquecer?"
          value={input}
          onChangeText={(texto) => setInput(texto) }
          autoFocus={true}
          showSoftInputOnFocus={true}
          

          />
          <TouchableOpacity style={stilos.areaCadastro} onPress={cadastrarTarefa}>
            <Text style={stilos.cadastrarText}>Cadastrar</Text>           
          </TouchableOpacity>
          <Text style={stilos.rodape2}>Ⓡ Leandro Garcia</Text>
        </Animatable.View>

      </SafeAreaView>
    </Modal>
    
    <BtnAnimado style={stilos.btnIncluir}
    useNativeDriver
    animation={"bounceInUp"}
    duration={2000}
    onPress={() => setBtnOpen(true)}
    >
      <Ionicons name="add-outline" size={35} color="#FFF"/>
    </BtnAnimado>

    <Text style={stilos.rodape}>Ⓡ Leandro Garcia</Text>

  </SafeAreaView>

  )
}


const stilos = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#171d31',
  },
  titulo:{
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFF'
  },
  btnIncluir:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3,
    }
  },
  modal:{
    flex:1,
    backgroundColor: '#171d31',
  },
  modalHeader:{
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitulo:{
    marginLeft: 15,
    fontSize: 16,
    color: '#FFF'
  },
  modalCorpo:{
    marginTop: 15,
  },
  input:{
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  areaCadastro:{
    backgroundColor: '#0094ff',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
  },
  cadastrarText:{
    fontSize: 20,
    color: '#FFF'
  },
  rodape:{
    marginTop: 10,
    marginLeft: 20,
    paddingBottom: 20,
    fontSize: 10,
    textAlign: 'leff',
    color: '#FFF'
  },
  rodape2:{
    marginTop: 450,
    marginLeft: 20,
    fontSize: 10,
    textAlign: 'leff',
    color: '#FFF'
  }
});