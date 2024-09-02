import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import * as Animatable  from 'react-native-animatable';

export default function ListaTarefas({tarefa, deleteItem}){
    return(
        <Animatable.View style={stilos.container}
        animation="bounceIn"
        useNativeDriver
        >
            <TouchableOpacity onPress={() => deleteItem(tarefa)}>
                <Ionicons name="checkmark-outline" size={25} color="#0094ff" />
            </TouchableOpacity>
        <View>
            <Text style={stilos.lista}> {tarefa.lista}</Text>
        </View>

        </Animatable.View>
         
    )
}


const stilos = StyleSheet.create({
container:{
    flex:1,
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 7,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
        width: 1,
        height: 3,
    }
},
lista:{
    color: '#121212',
    fontSize: 15,
    paddingLeft: 8,
    paddingRight: 20,
}
})