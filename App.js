import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, 
TouchableOpacity, SafeAreaView, StatusBar, FlatList, Modal, TextIput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';


const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  // Buscando todas as tarefas ao iniciar o App
  useEffect(()=> {
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);


  //Salvando caso tenha alguma tarefa alterada
  useEffect(()=> {
    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks();
    
  }, [task])

  function handleAdd(){
    if( input ==='') return;
    
    const data = {
      key: input,
      task: input
    };

    setTask([...task, data])
    setOpen(false);
    setInput('');
  }
  
  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find)
  })
  
  return(
    <SafeAreaView style={styles.container}>  
      <StatusBar backgroundColor='#393e46' barStyle="light-content" />

        <View style={styles.content}>
          <Text style={styles.title}>Minhas tarefas</Text>
        </View>

        <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={ (item) => String(item.key) }
        renderItem={ ({ item }) => <TaskList data={item} handleDelete={handleDelete}/>}
        />

        <Modal animationType="fade" transparent={false} visible={open}>

          <SafeAreaView style={styles.modal}>

            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setOpen(false) }>
                <Ionicons style={{marginLeft: 5, }}name="md-arrow-back" size={45} color="#e7dfd5"/>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Nova Tarefa</Text>
            </View>

            <Animatable.View style={styles.modalBody} animation="fadeInUp">
              <TextInput
              multiline={true}
              placeholderTextColor="#888888"
              autoCorrect={false}
              placeholder="O que precisa fazer hoje?" 
              style={styles.input}
              value={input}
              onChangeText={ (texto) => setInput(texto)}
              />

              <TouchableOpacity style={styles.handleAdd} onPress={ handleAdd }>
                <Text style={styles.handelAddText}>Cadastrar</Text>
              </TouchableOpacity>

            </Animatable.View>
          </SafeAreaView>
        </Modal>

        <AnimatedBtn
         style={styles.fab} 
         animation="bounceInUp"
         duration={1500}
         useNativeDriver 
         onPress={() => setOpen(true)}>
          <Ionicons name="ios-add" size={40} color="#eeeeee"/>
        </AnimatedBtn>
        

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#204051',
  },
  title:{
    marginTop: 20,
    paddingBottom: 10,
    fontSize: 30,
    color: '#e7dfd5',
    textAlign: 'center',
    justifyContent: 'center'
  },
  fab:{
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    right: 40,
    bottom: 40,
    backgroundColor: '#84a9ac',
    elevation: 2,
    zIndex: 9,
    shadowColor: '#3b6978',
    shadowOpacity: 0.2,
    shadowOffset:{
      width:1,
      height: 3
    }
  },
  modal:{
    flex: 1,
    backgroundColor: '#204051'
  },
  modalHeader:{
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitle:{
    marginLeft: 15,
    fontSize: 30,
    color: '#e7dfd5'
  },
  modalBody:{
    marginTop: 15,
  },
  input:{
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#e7dfd5',
    padding: 9,
    height: 80,
    textAlignVertical: 'top',
    color: '#204051',
    borderRadius: 5,
  },
  handleAdd: {
    backgroundColor: '#84a9ac',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    height: 40
  },
  handelAddText:{
    fontSize: 20,
    color: '#e7dfd5'
  }
})