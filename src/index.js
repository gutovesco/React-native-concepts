import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, StatusBar, FlatList, SafeAreaView, TouchableOpacity} from 'react-native'
import api from './services/api'

export default function App(){
    const [repositories, setRepositories] = useState([])
    const [likes, setLikes] = useState(0)

    useEffect(() => {
        api.get('repositories').then(response => {
            const getLikes = response.data.map(item => 
                setLikes(item.likes))
            setRepositories(response.data)
            console.log(response)
        })
    }, [])

    async function handleLike(id){
        const updateLikes = likes + 1
        const response = await api.post(`repositories/${id}/like`, {
            likes: updateLikes
        })

        const repository = response.data
        
        setRepositories([...repositories, repository])
    }
    
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <SafeAreaView style={styles.container}>
        <FlatList
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={({item}) => (
            <View style={styles.repositoryContainer}>
            <Text style={styles.texto}>{item.title}</Text>
              
              {item.techs.map(array => 
              <View style={styles.techsContainer}>
                  <Text style={styles.tech}>{array}</Text>
              </View>
              )}
              
  
            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-${item.id}`}
              >
                {item.likes} curtidas
              </Text>
              
            </View>
            <TouchableOpacity
            style={styles.button}
            onPress={() => handleLike(item.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${item.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
          </View>
        )}/>
        </SafeAreaView>
      </>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#7159c1",
    },
    repositoryContainer: {
      marginBottom: 15,
      marginHorizontal: 15,
      backgroundColor: "#fff",
      padding: 20,
    },
    repository: {
      fontSize: 32,
      fontWeight: "bold",
    },
    techsContainer: {
      flexDirection: "row",
      marginTop: 10,
    },
    tech: {
      fontSize: 12,
      fontWeight: "bold",
      marginRight: 10,
      backgroundColor: "#04d361",
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: "#fff",
    },
    likesContainer: {
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    likeText: {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 10,
    },
    button: {
      marginTop: 10,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 10,
      color: "#fff",
      backgroundColor: "#7159c1",
      padding: 15,
    },
  });
