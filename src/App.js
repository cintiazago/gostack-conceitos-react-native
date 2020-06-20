import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      try {
          api.get('repositories').then(response => {
            setRepositories(response.data);
          });
      } catch (error) {
          // Tratar o erro adequadamente
          console.log(error);
      }
  }, []);

  async function handleLikeRepository(id) {
    const { data } = await api.post(`repositories/${id}/like`)
    setRepositories(
      repositories.map(repository => repository.id === id ? data : repository)
    )
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
            data={repositories}
            keyExtractor={repository => repository.id}
            renderItem={({ item: repository }) => (
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>

                <FlatList
                  data={repository.techs}
                  keyExtractor={(tech) => tech}
                  style={styles.techsContainer}
                  renderItem={({ item: tech }) => (
                    <Text style={styles.tech}>{tech}</Text>
                  )}
                />

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes} curtidas
                  </Text>
                </View>

                <View style={styles.buttonsContainer}>
                  <View className="btnLike">
                    <TouchableOpacity
                      style={styles.buttonLike}
                      onPress={() => handleLikeRepository(repository.id)}
                      // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                      testID={`like-button-${repository.id}`}
                    >
                      <Text style={styles.buttonText}>Curtir</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="btnRemove">
                    <TouchableOpacity
                      style={styles.buttonRemove}
                      onPress={() => handleRemoveRepository(repository.id)}
                    >
                      <Text style={styles.buttonTextRemove}>Remover Repositório</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )}
          >

          </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
    paddingTop: 20
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 8,
  },
  repository: {
    fontSize: 28,
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
    borderRadius: 5
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#7159c1",   
    padding: 15,
    borderWidth: 1,
    borderColor: '#7159c1',
    borderRadius: 8
  },
  buttonTextRemove: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "orange",
    padding: 15,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 8
  },

  btnAddRepos: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    marginRight: 14,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 6,
  },
  txtAddRepos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7159c1'
  }
});